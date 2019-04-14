<?php
session_start(); 
ob_start();
include 'database.php';
echo "<pre>";
    print_r($_POST);
echo "</pre>";
if ($_POST["id"]!=""){
    $database = new database();
    $database->insert("szabadsagok", 
        "id, sznap, tipus", 
        "'1', ". 
        '"'.$_POST['datum'].'", '.
        '"'.$_POST['tipus'].'"', 
    "");	


    if ($database->getConn()->query($database->getSql()) === TRUE) { 
        echo "Grat !";
    } 
    else {
        echo "Sikertelen !";
    }
}                                       