<?php
/** 
 * @var array $fields Array de campos con 'label' y 'value'
 * @var string $ip Dirección IP del usuario
 * @var callable $escape Función para escapar HTML
 * @var callable $hasValue Función para verificar si un valor existe
 */
?>
<!doctype html>
<html lang="es">

<head>
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nueva solicitud de cotización</title>

  <style>
    /* Resets básicos para email */
    body,
    table,
    td,
    a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
      display: block;
    }

    table {
      border-collapse: collapse !important;
    }

    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      height: 100% !important;
      background: #f6f7f9;
    }

    /* Contenedor central */
    .wrapper {
      width: 100%;
      background: #f6f7f9;
      padding: 24px 0;
    }

    .container {
      width: 100%;
      max-width: 640px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e6e6e6;
      border-radius: 12px;
      overflow: hidden;
    }

    .header {
      background: #111111;
      color: #ffffff;
      font-weight: 700;
      padding: 18px 24px;
      font-size: 18px;
      text-align: left;
    }

    .content {
      padding: 20px 24px;
      color: #222;
      font-size: 14px;
      line-height: 1.5;
    }

    .table {
      width: 100%;
    }

    .table td {
      padding: 8px 0;
      border-bottom: 1px solid #eeeeee;
      vertical-align: top;
      font-size: 14px;
      line-height: 1.45;
    }

    .label {
      width: 220px;
      font-weight: 700;
    }

    .muted {
      color: #999;
      font-size: 12px;
    }

    /* Botón (por si lo necesitás) */
    .btn {
      display: inline-block;
      background: #111;
      color: #fff !important;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 6px;
    }

    /* Mobile tweaks */
    @media only screen and (max-width:600px) {
      .header {
        padding: 16px 18px;
        font-size: 17px;
        text-align: center;
      }

      .content {
        padding: 18px 18px;
        font-size: 16px;
      }

      .label {
        width: auto;
        display: block;
        margin-bottom: 4px;
      }

      .table td {
        display: block;
        width: 100%;
        border-bottom: 0;
        padding: 8px 0;
      }

      .table tr {
        border-bottom: 1px solid #eee;
      }

      .muted {
        font-size: 12px;
      }
    }

    /* iOS auto-links color fix */
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }
  </style>
</head>

<body style="font-family:Arial,Helvetica,sans-serif;">
  <center class="wrapper">
    <table role="presentation" class="container" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td class="header">
          <?php
          // Mostrar el source si existe, sino un título por defecto
          echo $hasValue($fields['source']['value'])
            ? $escape($fields['source']['value'])
            : 'Nueva solicitud de cotización';
          ?>
        </td>
      </tr>

      <tr>
        <td class="content">
          <p style="margin:0 0 12px">Ingresó un nuevo pedido desde el formulario del sitio.</p>

          <table role="presentation" class="table" cellpadding="0" cellspacing="0">
            <?php
            // Renderizar solo los campos que tienen valor
            foreach ($fields as $key => $field):
              // Saltar 'source' porque ya se muestra en el header
              if ($key === 'source') continue;

              // Solo renderizar si el campo tiene valor
              if (!$hasValue($field['value'])) continue;

              $value = $field['value'];
              $label = $field['label'];
            ?>
              <tr>
                <td class="label"><?= $escape($label) ?></td>
                <td>
                  <?php if ($key === 'email'): ?>
                    <a href="mailto:<?= $escape($value) ?>" style="color:#111;"><?= $escape($value) ?></a>
                  <?php elseif ($key === 'originUrl'): ?>
                    <a href="<?= $escape($value) ?>" style="color:#111;"><?= $escape($value) ?></a>
                  <?php elseif ($key === 'comments'): ?>
                    <span style="white-space:pre-line;"><?= $escape($value) ?></span>
                  <?php else: ?>
                    <?= $escape($value) ?>
                  <?php endif; ?>
                </td>
              </tr>
            <?php endforeach; ?>
          </table>

          <?php if ($hasValue($ip)): ?>
            <p class="muted" style="margin:16px 0 0;">
              IP: <?= $escape($ip) ?>
            </p>
          <?php endif; ?>
        </td>
      </tr>
    </table>
  </center>
</body>

</html>
