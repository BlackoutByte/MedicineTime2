<?php
// Inclui a conexão com o banco de dados
include("conexao.php");
session_start();

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura os dados do formulário
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_STRING);

    // Verifica se os campos foram preenchidos corretamente
    if ($email && $senha) {
        // Prepara a query para buscar o usuário com base no e-mail
        $query = $mysqli->prepare("SELECT id, nome_completo, senha_hash FROM usuarios WHERE email = ?");
        $query->bind_param("s", $email);
        $query->execute();
        $resultado = $query->get_result();

        // Verifica se o e-mail foi encontrado no banco de dados
        if ($resultado->num_rows > 0) {
            $usuario = $resultado->fetch_assoc();
            $_SESSION['usuario_id']=$usuario['id'];

            // Verifica se a senha está correta
            if (password_verify($senha, $usuario['senha_hash'])) {
                // Retorna o ID do usuário como resposta JSON para o JavaScript
                header('Content-Type: application/json');
                echo json_encode([
                    "status" => "success",
                    "usuario_id" => $usuario['id']
                ]);
                exit;
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Senha incorreta. Tente novamente."
                ]);
                exit;
            }
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "E-mail não encontrado. Verifique as informações."
            ]);
            exit;
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Por favor, preencha todos os campos corretamente."
        ]);
        exit;
    }
}

// Fecha a conexão com o banco de dados
$mysqli->close();
?>
