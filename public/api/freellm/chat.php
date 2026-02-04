<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed',
    ]);
    exit;
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid JSON body',
    ]);
    exit;
}

$message = $payload['message'] ?? '';
if (!is_string($message) || trim($message) === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing "message"',
    ]);
    exit;
}

$headers = function_exists('getallheaders') ? getallheaders() : [];
$authorization = '';
if (isset($headers['Authorization'])) {
    $authorization = (string)$headers['Authorization'];
} elseif (isset($headers['authorization'])) {
    $authorization = (string)$headers['authorization'];
} elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authorization = (string)$_SERVER['HTTP_AUTHORIZATION'];
}

if (trim($authorization) === '') {
    $serverKey = getenv('APIFREELLM_API_KEY') ?: getenv('VITE_APIFREELLM_API_KEY');

    if (!is_string($serverKey) || trim($serverKey) === '') {
        $home = getenv('HOME');
        if (is_string($home) && trim($home) !== '') {
            $candidateFiles = [
                rtrim($home, '/\\') . '/.apifreellm_api_key',
                rtrim($home, '/\\') . '/apifreellm_api_key.txt',
            ];

            foreach ($candidateFiles as $candidate) {
                if (is_file($candidate) && is_readable($candidate)) {
                    $fileKey = trim((string)@file_get_contents($candidate));
                    if ($fileKey !== '') {
                        $serverKey = $fileKey;
                        break;
                    }
                }
            }
        }
    }

    // Fallback: archivo local en el mismo directorio que este script (fuera del webroot si se protege)
    if (!is_string($serverKey) || trim($serverKey) === '') {
        $localKeyFile = __DIR__ . '/.apifreellm_api_key';
        if (is_file($localKeyFile) && is_readable($localKeyFile)) {
            $localKey = trim((string)@file_get_contents($localKeyFile));
            if ($localKey !== '') {
                $serverKey = $localKey;
            }
        }
    }

    if (is_string($serverKey) && trim($serverKey) !== '') {
        $authorization = 'Bearer ' . trim($serverKey);
    }
}

if (trim($authorization) === '') {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'ApiFreeLLM API key not configured on server (APIFREELLM_API_KEY or ~/.apifreellm_api_key).',
    ]);
    exit;
}

$targetUrl = 'https://apifreellm.com/api/v1/chat';

if (function_exists('curl_init')) {
    $ch = curl_init($targetUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: ' . $authorization,
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'message' => $message,
    ]));
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    $upstreamBody = curl_exec($ch);
    $curlErr = curl_error($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($upstreamBody === false) {
        http_response_code(502);
        echo json_encode([
            'success' => false,
            'error' => 'Upstream fetch failed: ' . $curlErr,
        ]);
        exit;
    }

    http_response_code($status > 0 ? $status : 200);
    echo $upstreamBody;
    exit;
}

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\nAuthorization: {$authorization}\r\n",
        'content' => json_encode(['message' => $message]),
        'timeout' => 30,
    ],
]);

$upstreamBody = @file_get_contents($targetUrl, false, $context);
if ($upstreamBody === false) {
    http_response_code(502);
    echo json_encode([
        'success' => false,
        'error' => 'Upstream fetch failed',
    ]);
    exit;
}

echo $upstreamBody;
