<?php
// php/mailer/QuoteMailer.php
namespace App\Mailer;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class QuoteMailer
{
  private string $host;
  private int    $port;
  private bool   $smtpAuth;
  private string $username;
  private string $password;
  private string $encryption; // 'tls' o 'ssl'
  private string $fromEmail;
  private string $fromName;
  private string $toEmail;
  private string $toName;

  private ?string $lastError = null;

  public function getLastError(): ?string
  {
    return $this->lastError;
  }

  public function __construct(array $cfg)
  {
    $this->host       = $cfg['host']       ?? 'smtp.example.com';
    $this->port       = (int)($cfg['port'] ?? 587);
    $this->smtpAuth   = (bool)($cfg['smtp_auth'] ?? true);
    $this->username   = $cfg['username']   ?? '';
    $this->password   = $cfg['password']   ?? '';
    $this->encryption = $cfg['encryption'] ?? 'tls';
    $this->fromEmail  = $cfg['from_email'] ?? 'no-reply@example.com';
    $this->fromName   = $cfg['from_name']  ?? 'Sitio Web';
    $this->toEmail    = $cfg['to_email']   ?? 'ventas@example.com';
    $this->toName     = $cfg['to_name']    ?? 'Ventas';
  }

  /** Envía el email de cotización con HTML y AltBody.
   *  $data: ['name','email','phone','surface','province','comments','profile','ip','originUrl','source']
   */
  public function send(array $data): bool
  {
    $this->lastError = null;

    $mail = new PHPMailer(true);

    // Construir contenidos (HTML + ALT)
    [$html, $alt] = $this->buildBodies($data);

    try {
      // SMTP
      $_ENV['VITE_ENVIRONMENT'] === 'dev'
        ? $mail->isSendmail()
        : $mail->isSMTP();

      $mail->Host       = $this->host;
      $mail->SMTPAuth   = $this->smtpAuth;
      $mail->Username   = $this->username;
      $mail->Password   = $this->password;
      $mail->CharSet    = 'UTF-8';
      $mail->SMTPSecure = $this->encryption === 'ssl'
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
      $mail->Port = $this->port;

      $mail->CharSet  = 'UTF-8';
      $mail->Encoding = 'base64';

      // Remitentes / destinatarios
      $mail->setFrom($this->fromEmail, $this->fromName);
      $mail->addAddress($this->toEmail, $this->toName);

      // Reply-To al usuario
      if (!empty($data['email'])) {
        $mail->addReplyTo($data['email'], $data['name'] ?? $data['email']);
      }

      // Contenido
      $mail->isHTML(true);
      $mail->Subject = 'Nueva solicitud de cotización';
      $mail->Body    = $html;
      $mail->AltBody = $alt;

      return $mail->send();
    } catch (Exception $e) {
      $this->lastError = $e->getMessage();
      if (isset($mail) && $mail->ErrorInfo) {
        $this->lastError .= ' | ErrorInfo: ' . $mail->ErrorInfo;
      }
      return false;
    }
  }

  /** Arma el HTML (desde plantilla) + AltBody */
  private function buildBodies(array $data): array
  {
    $escape = fn($v) => htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    // Helper para verificar si un campo tiene valor
    $hasValue = fn($v) => isset($v) && $v !== '' && $v !== null;

    // Definir los campos con sus etiquetas para renderizado dinámico
    $fields = [
      'name'     => ['label' => 'Nombre',              'value' => $data['name'] ?? ''],
      'email'    => ['label' => 'Email',               'value' => $data['email'] ?? ''],
      'phone'    => ['label' => 'Teléfono',            'value' => $data['phone'] ?? ''],
      'surface'  => ['label' => 'Superficie (m²)',     'value' => $data['surface'] ?? ''],
      'province' => ['label' => 'Provincia',           'value' => $data['province'] ?? ''],
      'comments' => ['label' => 'Mensaje',             'value' => $data['comments'] ?? ''],
      'profile'  => ['label' => 'Perfil de usuario',   'value' => $data['profile'] ?? ''],
      'originUrl'=> ['label' => 'Origen (URL)',        'value' => $data['originUrl'] ?? ''],
      'source'   => ['label' => 'Origen de la consulta', 'value' => $data['source'] ?? ''],
    ];

    // AltBody texto plano - solo campos con valor
    $alt = "Nueva solicitud de cotización\n\n";
    foreach ($fields as $key => $field) {
      if ($hasValue($field['value'])) {
        $alt .= $field['label'] . ": " . $field['value'] . "\n";
      }
    }
    // IP siempre se muestra
    $alt .= "IP: " . ($data['ip'] ?? '') . "\n";

    // HTML desde plantilla PHP
    $tplPath = __DIR__ . '/../templates/quote_email.php';

    if (!is_file($tplPath)) {
      // fallback ultra simple
      $html = '<html><body><pre>' . nl2br($escape($alt)) . '</pre></body></html>';
      return [$html, $alt];
    }

    // Variables disponibles dentro de la plantilla
    $vars = [
      'fields'   => $fields,
      'ip'       => $data['ip'] ?? '',
      'escape'   => $escape,
      'hasValue' => $hasValue,
    ];

    // Render con output buffering
    ob_start();
    extract($vars, EXTR_SKIP);
    include $tplPath;
    $html = (string)ob_get_clean();

    return [$html, $alt];
  }
}
