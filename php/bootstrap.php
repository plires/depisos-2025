<?php
require_once(__DIR__ . '/../vendor/autoload.php');

// ============================
// CONFIGURACIÓN GLOBAL INICIAL
// ============================

// Establecer zona horaria
date_default_timezone_set('America/Argentina/Buenos_Aires');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

// Detectar entorno desde variable de entorno o fallback a 'prod'
$env = $_ENV['VITE_ENVIRONMENT'] ?? getenv('APP_ENV') ?? 'prod';
$GLOBALS['env'] = $env;

// ============================
// CONFIGURACIÓN DE ERRORES
// ============================

if ($env === 'dev') {
  // Mostrar errores en pantalla (para debugging)
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
} else {
  // Ocultar errores al usuario final
  ini_set('display_errors', 0);
  ini_set('display_startup_errors', 0);
  error_reporting(0);
}

// ============================
// MANEJADOR DE ERRORES
// ============================

set_error_handler(function ($severity, $message, $file, $line) {
  $log = "[PHP ERROR] [$severity] $message en $file línea $line";
  error_log($log);

  if ($GLOBALS['env'] === 'dev') {
    echo "<pre>$log</pre>";
  }
});

// ============================
// MANEJADOR DE EXCEPCIONES
// ============================

set_exception_handler(function ($exception) {
  $log = "[EXCEPCIÓN] " . $exception->getMessage() . " en " . $exception->getFile() . ":" . $exception->getLine();
  error_log($log);

  if (php_sapi_name() === 'cli') {
    echo "$log\n";
    exit(1);
  }

  if ($GLOBALS['env'] === 'dev') {
    echo "<pre>$log</pre>";
  } else {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error interno del servidor.']);
  }
});
