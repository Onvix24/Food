<?php
// Отримати JSON-дані, що були надіслані методом POST
$_POST = json_decode(file_get_contents("php://input"), true);
// Вивести зміст масиву $_POST, використовуючи функцію var_dump
echo var_dump($_POST);