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

  private ?string $lastError = null;   // 👈 nuevo

  public function getLastError(): ?string
  {   // 👈 getter
    return $this->lastError;
  }

  public function __construct(array $cfg)
  {
    $this->host       = $cfg['host']       ?? 'smtp.example.com';
    $this->port       = (int)($cfg['port'] ?? 587);
    $this->smtpAuth   = (bool)($cfg['smtp_auth'] ?? true);
    $this->username   = $cfg['username']   ?? '';
    $this->password   = $cfg['password']   ?? '';
    $this->encryption = $cfg['encryption'] ?? 'tls'; // 'tls' | 'ssl'
    $this->fromEmail  = $cfg['from_email'] ?? 'no-reply@example.com';
    $this->fromName   = $cfg['from_name']  ?? 'Sitio Web';
    $this->toEmail    = $cfg['to_email']   ?? 'ventas@example.com';
    $this->toName     = $cfg['to_name']    ?? 'Ventas';
  }

  /** Envía el email de cotización con HTML y AltBody.
   *  $data: ['nombre','email','telefono','superficie','provincia','mensaje','ip']
   */
  public function send(array $data): bool
  {

    $this->lastError = null;

    $mail = new PHPMailer(true);

    // Construir contenidos (HTML + ALT)
    [$html, $alt] = $this->buildBodies($data);

    try {
      // SMTP
      //Server settings
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
        $mail->addReplyTo($data['email'], $data['nombre'] ?? $data['email']);
      }

      // Contenido
      $mail->isHTML(true);
      $mail->Subject = 'Nueva solicitud de cotización';
      $mail->Body    = $html;
      $mail->AltBody = $alt;

      // (Opcional) DKIM
      // $mail->DKIM_domain = 'tu-dominio.com';
      // $mail->DKIM_private = __DIR__.'/../../dkim/private.key';
      // $mail->DKIM_selector = 'default';
      // $mail->DKIM_identity = $mail->From;

      return $mail->send();
    } catch (Exception $e) {
      // Detalle fino del error
      $this->lastError = $e->getMessage();        // Exception de PHPMailer
      if (isset($mail) && $mail->ErrorInfo) {
        $this->lastError .= ' | ErrorInfo: ' . $mail->ErrorInfo;
      }
      // Log opcional a archivo:
      // error_log('[MAIL ERROR] '.$this->lastError);
      return false;
    }
  }

  /** Arma el HTML (desde plantilla) + AltBody */
  private function buildBodies(array $data): array
  {
    $escape = fn($v) => htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    // AltBody texto plano
    $alt = "Nueva solicitud de cotización\n\n" .
      "Nombre: " . ($data['name'] ?? '') . "\n" .
      "Email:  " . ($data['email'] ?? '') . "\n" .
      "Teléfono: " . ($data['phone'] ?? '') . "\n" .
      "Superficie (m2): " . ($data['surface'] ?? '') . "\n" .
      "Provincia: " . ($data['province'] ?? '') . "\n" .
      "Mensaje:\n" . ($data['comments'] ?? '') . "\n" .
      "Perfil de usuario:\n" . ($data['profile'] ?? '') . "\n" .
      "Origen URL: " . ($data['originUrl'] ?? '') . "\n" .
      "Origen Consulta: " . ($data['source'] ?? '') . "\n" .
      "IP: " . ($data['ip'] ?? '') . "\n";

    // HTML desde plantilla PHP
    $tplPath = __DIR__ . '/../templates/quote_email.php';

    if (!is_file($tplPath)) {
      // fallback ultra simple
      $html = '<html><body><pre>' . nl2br($escape($alt)) . '</pre></body></html>';
      return [$html, $alt];
    }

    // variables disponibles dentro de la plantilla
    $vars = [
      'name'     => $data['name']    ?? '',
      'email'      => $data['email']     ?? '',
      'phone'   => $data['phone']  ?? '',
      'surface' => $data['surface'] ?? '',
      'province'  => $data['province'] ?? '',
      'comments'    => $data['comments']   ?? '',
      'profile'    => $data['profile']   ?? '',
      'ip'         => $data['ip']        ?? '',
      'originUrl'  => $data['originUrl']  ?? '',
      'source'  => $data['source']  ?? '',
      'escape'     => $escape,
    ];

    // Render con output buffering
    ob_start();
    /** @noinspection PhpIncludeInspection */

    extract($vars, EXTR_SKIP);

    include $tplPath;
    $html = (string)ob_get_clean();

    return [$html, $alt];
  }
}
