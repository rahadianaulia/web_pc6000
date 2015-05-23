<?php
function GetKoneksi(){
    $server = "localhost";
    $user = "root";
    $password = "";
    $database = "pc6000";
    $port = "3306";

    $conn_db = mysqli_connect($server,$user,$password,$database,$port) or die("Error " . mysqli_error($conn_db));
    return $conn_db;
}
?>