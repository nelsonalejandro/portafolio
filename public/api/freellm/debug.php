<?php

declare(strict_types=1);

header('Content-Type: text/plain; charset=utf-8');

echo "=== Debug de rutas y permisos ===\n";

$home = getenv('HOME');
echo "HOME (getenv): ";
var_dump($home);
echo "\n";

echo "\nRutas candidatas:\n";
$candidates = [
    rtrim($home, '/\\') . '/.apifreellm_api_key',
    rtrim($home, '/\\') . '/apifreellm_api_key.txt',
];
foreach ($candidates as $c) {
    echo "- $c\n";
    echo "  is_file: " . (is_file($c) ? 'YES' : 'NO') . "\n";
    echo "  is_readable: " . (is_readable($c) ? 'YES' : 'NO') . "\n";
    if (is_file($c) && is_readable($c)) {
        echo "  contenido: " . trim((string)file_get_contents($c)) . "\n";
    }
    echo "\n";
}

echo "=== Variables de entorno ===\n";
$envs = ['APIFREELLM_API_KEY', 'VITE_APIFREELLM_API_KEY', 'HOME'];
foreach ($envs as $e) {
    $val = getenv($e);
    echo "$e: ";
    var_dump($val);
    echo "\n";
}

echo "=== Directorio actual de trabajo ===\n";
echo "getcwd(): " . getcwd() . "\n";
echo "\n";

echo "=== Intento leer desde .apifreellm_api_key en public_html ===\n";
$localKey = __DIR__ . '/.apifreellm_api_key';
echo "$localKey\n";
echo "  is_file: " . (is_file($localKey) ? 'YES' : 'NO') . "\n";
echo "  is_readable: " . (is_readable($localKey) ? 'YES' : 'NO') . "\n";
if (is_file($localKey) && is_readable($localKey)) {
    echo "  contenido: " . trim((string)file_get_contents($localKey)) . "\n";
}
echo "\n";

echo "=== Fin del debug ===\n";
