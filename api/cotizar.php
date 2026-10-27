<?php
// api/cotizar.php

require_once __DIR__ . '/../php/bootstrap.php';
require_once __DIR__ . '/../php/mailer/QuoteMailer.php';

use App\Mailer\QuoteMailer;

if ($_ENV['VITE_ENVIRONMENT'] === 'dev') {
  $allowedOrigin = '*';
} else {
  $allowedOrigin = $_ENV['VITE_DOMAIN'];
}

header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400"); // cachea preflight

// Responder preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204); // No Content
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Método no permitido']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Payload inválido']);
  exit;
}
// ==== Rate limiting simple (por IP) ====
// Máx 3 solicitudes / 10 minutos
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucketFile = sys_get_temp_dir() . '/quote_rate_' . md5($ip) . '.json';
$now = time();
$window = 10 * 60; // 10 min
$maxReq = 5;

$history = [];
if (file_exists($bucketFile)) {
  $json = file_get_contents($bucketFile);
  $history = json_decode($json, true) ?: [];
}
// limpiar fuera de ventana
$history = array_values(array_filter($history, fn($t) => ($now - (int)$t) < $window));
if (count($history) >= $maxReq) {
  http_response_code(429);
  echo json_encode(['success' => false, 'error' => 'Demasiadas solicitudes. Intentá más tarde.']);
  exit;
}

// ==== reCAPTCHA v3 ====
$recaptchaSecret = $_ENV['RECAPTCHA_SECRET_KEY'] ?? '';
$token = $data['recaptchaToken'] ?? '';
if ($recaptchaSecret) {
  $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => http_build_query([
      'secret' => $recaptchaSecret,
      'response' => $token,
      'remoteip' => $ip,
    ]),
    CURLOPT_TIMEOUT => 5,
  ]);
  $resp = curl_exec($ch);
  curl_close($ch);
  $rc = json_decode($resp, true);

  // score recomendado >= 0.5
  $score = 0.5;

  if ($_ENV['VITE_ENVIRONMENT'] === 'dev') {
    $score = 0.3;
  }

  if (!($rc['success'] ?? false) || ($rc['score'] ?? 0) < $score) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Verificación reCAPTCHA fallida']);
    exit;
  }
}

// ==== Saneado + validación servidor ====
function clean($v)
{
  $v = trim((string)$v);
  return filter_var($v, FILTER_UNSAFE_RAW);
}

$name      = clean($data['name']      ?? '');
$email     = clean($data['email']     ?? '');
$phone     = clean($data['phone']     ?? '');
$surface   = $data['surface']         ?? ''; // lo parseamos aparte para aceptar coma
$province  = clean($data['province']  ?? '');
$comments  = clean($data['comments']  ?? '');
$profile    = clean($data['profile']    ?? '');
$originUrl = clean($data['originUrl'] ?? '');
$source    = clean($data['source']    ?? '');
$type      = clean($data['type']      ?? '');

$isContacto = ($type === 'contacto');

$errors = [];

// --- Validaciones SIEMPRE ---
if (mb_strlen($name) < 3) {
  $errors['name'] = 'Nombre demasiado corto.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = 'Email inválido.';
}

if (preg_match_all('/\d/', $phone) < 7) {
  $errors['phone'] = 'Teléfono inválido.';
}

// normalizo comments por si llega crudo
$comments = trim(clean($data['comments'] ?? ''));
if (mb_strlen($comments) < 10) {
  $errors['comments'] = 'Ingresá un comentario (al menos 10 caracteres).';
}

// --- Condicionales por tipo ---
if ($isContacto) {
  // Validar profile; ignorar province y surface
  if (empty($profile)) {
    $errors['profile'] = 'Perfil requerido.';
  }
} else {
  // Ignorar profile; validar province y surface

  if (empty($province)) {
    $errors['province'] = 'Provincia requerida.';
  }

  // surface: aceptar coma decimal, > 0
  $surfaceRaw = str_replace(',', '.', trim((string)($surface ?? '')));
  $surfaceNum = ($surfaceRaw !== '' && is_numeric($surfaceRaw)) ? (float)$surfaceRaw : '';

  if ($surfaceNum === null || $surfaceNum <= 0) {
    $errors['surface'] = 'superficie inválida.';
  }

  if ($surfaceNum !== null && $surfaceNum > 100000) {
    $errors['surface'] = 'superficie inválida.';
  }
}

// (opcional) recortar tamaños máximos por seguridad
$originUrl = mb_substr($originUrl, 0, 1024);

// Si querés validar que sea URL válida (opcional, sin bloquear):
if ($originUrl && !filter_var($originUrl, FILTER_VALIDATE_URL)) {
  $originUrl = ''; // o dejar como está, pero yo lo piso a vacío si es inválida
}

if (!empty($errors)) {
  http_response_code(422);

  // Tomar el primer error para mostrar como comentario principal
  $firstKey = array_key_first($errors);
  $firstMsg = $errors[$firstKey];

  echo json_encode([
    'success' => false,
    'error'   => $firstMsg,   // 👈 mensaje específico (no genérico)
    'field'   => $firstKey,   // 👈 nombre del campo con el primer error
    'fields'  => $errors      // 👈 mapa completo por campo
  ], JSON_UNESCAPED_UNICODE);

  exit;
}

// Datos ya validados
$payload = [
  'name'        => $name,
  'email'       => $email,
  'phone'       => $phone,
  'surface'     => $surface,
  'province'    => $province,
  'comments'    => $comments,
  'profile'      => $profile,
  'ip'          => $ip,
  'originUrl'   => $originUrl,
  'source'      => $source,
  'type'        => $type,
];

// Incluir modelo de Contact
require_once __DIR__ . '/models/Contact.php';

// ===== GUARDAR EN BASE DE DATOS =====
$contact = new Contact();

// Asignar valores al objeto
$contact->name = $payload['name'];
$contact->email = $payload['email'];
$contact->phone = $payload['phone'];
$contact->comments = $payload['comments'];
$contact->surface = $payload['surface'];
$contact->province = $payload['province'];
$contact->profile = $payload['profile'];
$contact->ip = $payload['ip'];
$contact->originUrl = $payload['originUrl'];
$contact->source = $payload['source'];

// Intentar guardar en la base de datos
$saved = $contact->create();

if (!$saved) {
  // Solo registrar el error, pero continuar
  error_log("Error al guardar en la base de datos - Email: {$email}");
}

// Config SMTP
$mailCfg = [
  'host'       => $_ENV['SMTP_HOST'],
  'port'       => (int)($_ENV['SMTP_PORT']),
  'smtp_auth'  => true,
  'username'   => $_ENV['SMTP_USER'],
  'password'   => $_ENV['SMTP_PASS'],
  'encryption' => $_ENV['SMTP_ENCRYPTION'],
  'from_email' => $_ENV['SMTP_FROM'],
  'from_name'  => $_ENV['SMTP_FROM_NAME'],
  'to_email'   => $_ENV['SALES_TO'],
  'to_name'    => $_ENV['SALES_TO_NAME'],
];

$mailer = new QuoteMailer($mailCfg);
$sent = $mailer->send($payload);

if (!$sent) {
  $dev = ($_ENV['VITE_ENVIRONMENT'] ?? '') !== 'production';
  $detail = $mailer->getLastError();

  // Logueá siempre en servidor
  if ($detail) {
    error_log('[MAIL ERROR] ' . $detail);
  }

  http_response_code(500);
  echo json_encode([
    'success' => false,
    'error'   => $dev && $detail
      ? ('No se pudo enviar el correo: ' . $detail) // detalle en DEV
      : 'No se pudo enviar el correo. Intentalo más tarde.' // genérico en PROD
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

// ✅ Contar al historial de envios ($bucketFile) SOLO si el mail se envió
$history[] = $now;
file_put_contents($bucketFile, json_encode($history), LOCK_EX);

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
