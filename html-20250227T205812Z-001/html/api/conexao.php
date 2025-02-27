<?php
$hostname = "localhost";
$database = "mtwebana";
$username = "root";
$password = "";

$mysqli = new mysqli($hostname, $username, $password, $database);

if ($mysqli->connect_error) {
    die("Erro de conexão: " . $mysqli->connect_error);
}
?>