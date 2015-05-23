<?php
include_once("../config.php");

if(isset($_POST["params"]))
{
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];

    if($action == "getSupplier"){
        echo GetSupplier();
    }
    if($action == "getSupplierById"){
        echo GetSupplierById($params);
    }
    if($action == "addSupplier"){
        echo AddSupplier($params);
    }
}



function GetSupplier(){
    $cnn = GetKoneksi();
    $que = "select * from suplier";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function GetSupplierById($params){
    $cnn = GetKoneksi();
    $param = json_decode($params);
    $que = "select * from suplier where idsuplier=$param->id";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function AddSupplier($params){
    $supplier = json_decode($params);
    $que = "insert into suplier values (null, '$supplier->nama', '$supplier->alamat', '$supplier->telp')";
    $cnn = GetKoneksi();
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return json_encode($result);
}


?>