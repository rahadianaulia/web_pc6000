<?php
include("../config.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nama=$request->nama;
$alamat=$request->alamat;
$telp=$request->telp;

mysqli_query($conn_db, "insert into suplier(nama, alamat, telp) values('$nama','$alamat','$telp')");

?>