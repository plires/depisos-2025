<?php
// api/cotizar.php

require_once __DIR__ . '/../php/bootstrap.php';
require_once __DIR__ . '/../php/mailer/QuoteMailer.php';

use App\Mailer\QuoteMailer;

$allowedOrigin = $_ENV['VITE_DOMAIN'];

header("Access-Control-Allow-Origin: $allowedOrigin");
header("Vary: Origin"); // por si servís a varios orígenes
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
$maxReq = 3;

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
// agregamos este intento (aún si falla validación)
$history[] = $now;
file_put_contents($bucketFile, json_encode($history));

// ==== reCAPTCHA v3 ====
$recaptchaSecret = $_ENV['VITE_RECAPTCHA_SECRET_KEY'];
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

$name    = clean($data['name']   ?? '');
$email     = clean($data['email']    ?? '');
$phone  = clean($data['phone'] ?? '');
$surface = $data['surface']     ?? null;
$province = clean($data['province'] ?? '');
$comments   = clean($data['comments']  ?? '');
$originUrl   = clean($data['originUrl']  ?? '');

$errors = [];
if (mb_strlen($name) < 3) $errors['name'] = 'Nombre demasiado corto.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Email inválido.';
if (preg_match_all('/\d/', $phone) < 7) $errors['phone'] = 'Teléfono inválido.';
if (!is_numeric($surface) || $surface <= 0 || $surface > 100000) $errors['surface'] = 'surface inválida.';
if ($province === '') $errors['province'] = 'Provincia requerida.';
$comments = trim(clean($data['comments'] ?? ''));
if (mb_strlen($comments) < 5) $errors['comments'] = 'Ingresá un comentario (al menos 10 caracteres).';

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
  'name'     => $name,
  'email'      => $email,
  'phone'   => $phone,
  'surface' => $surface,
  'province'  => $province,
  'comments'    => $comments,
  'ip'         => $ip,
  'originUrl'  => $originUrl,
];

// Config SMTP (mejor si vienen de .env)
$mailCfg = [
  'host'       => $_ENV['SMTP_HOST']       ?? 'smtp.tuservidor.com',
  'port'       => (int)($_ENV['SMTP_PORT'] ?? 587),
  'smtp_auth'  => true,
  'username'   => $_ENV['SMTP_USER']       ?? 'no-reply@tusitio.com',
  'password'   => $_ENV['SMTP_PASS']       ?? '',
  'encryption' => $_ENV['SMTP_ENCRYPTION'] ?? 'tls', // 'tls' | 'ssl'
  'from_email' => $_ENV['SMTP_FROM']       ?? 'no-reply@tusitio.com',
  'from_name'  => $_ENV['SMTP_FROM_NAME']  ?? 'Sitio Web',
  'to_email'   => $_ENV['SALES_TO']        ?? 'ventas@tusitio.com',
  'to_name'    => $_ENV['SALES_TO_NAME']   ?? 'Equipo de Ventas',
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

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
