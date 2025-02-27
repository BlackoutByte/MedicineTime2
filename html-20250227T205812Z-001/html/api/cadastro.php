<?php
header("Content-Type: application/json");
require_once "conexao.php"; // Arquivo de conexão com o banco

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["success" => false, "message" => "Dados inválidos"]);
    exit;
}

$nome = $input["nome-completocad"];
$email = $input["emailcad"];
$nascimento = $input["nascimentocad"];
$senha = password_hash($input["senhacad"], PASSWORD_DEFAULT);
$sexo = $input["sexo"];

try {
    $pdo = new PDO("mysql:host=localhost;dbname=mtwebana", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO usuarios (nome_completo, email, nascimento, senha_hash, sexo) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$nome, $email, $nascimento, $senha, $sexo]);

    echo json_encode(["success" => true, "message" => "Usuário cadastrado com sucesso"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $e->getMessage()]);
}
?>
