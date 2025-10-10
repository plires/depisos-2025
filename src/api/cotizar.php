<?php
// api/cotizar.php
header('Content-Type: application/json; charset=utf-8');

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
$recaptchaSecret = 'TU_RECAPTCHA_SECRET_KEY'; // <-- poné tu SECRET
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
  if (!($rc['success'] ?? false) || ($rc['score'] ?? 0) < 0.5) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Verificación reCAPTCHA fallida']);
    exit;
  }
}

// ==== Saneado + validación servidor ====
function clean($v)
{
  $v = trim((string)$v);
  return filter_var($v, FILTER_UNSAFE_RAW, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH);
}

$nombre    = clean($data['nombre']   ?? '');
$email     = clean($data['email']    ?? '');
$telefono  = clean($data['telefono'] ?? '');
$superficie = $data['superficie']     ?? null;
$provincia = clean($data['provincia'] ?? '');
$mensaje   = clean($data['mensaje']  ?? '');

$errors = [];
if (mb_strlen($nombre) < 3) $errors['nombre'] = 'Nombre demasiado corto.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Email inválido.';
if (preg_match_all('/\d/', $telefono) < 7) $errors['telefono'] = 'Teléfono inválido.';
if (!is_numeric($superficie) || $superficie <= 0 || $superficie > 100000) $errors['superficie'] = 'Superficie inválida.';
if ($provincia === '') $errors['provincia'] = 'Provincia requerida.';

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['success' => false, 'error' => 'Validación fallida', 'fields' => $errors], JSON_UNESCAPED_UNICODE);
  exit;
}

// ==== Envío (email simple o tu integración) ====
$to = 'ventas@tusitio.com';
$subject = 'Nueva solicitud de cotización';
$body = "IP: $ip\nNombre: $nombre\nEmail: $email\nTeléfono: $telefono\nSuperficie (m2): $superficie\nProvincia: $provincia\nMensaje:\n$mensaje\n";
$headers = "From: no-reply@tusitio.com\r\nReply-To: $email\r\nX-Mailer: PHP/" . phpversion();

$mailOk = @mail($to, $subject, $body, $headers);
// $mailOk = true; // descomentar en dev

if (!$mailOk) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'No se pudo enviar el correo. Intentalo más tarde.']);
  exit;
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
