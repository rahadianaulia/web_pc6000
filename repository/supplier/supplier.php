<?php
include_once("../config.php");

if(isset($_POST["params"]))
{
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];

    if($action == "getSupplier"){
        echo GetSupplier($conn_db);
    }
    if($action == "getSupplierById"){
        echo GetSupplierById($conn_db,$params);
    }
    if($action == "addSupplier"){
        echo AddSupplier($conn_db,$params);
    }
}



function GetSupplier($cnn){
    $que = "select * from suplier";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function GetSupplierById($cnn,$params){
    $param = json_decode($params);
    $que = "select * from suplier where idsuplier=$param->id";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function AddSupplier($cnn,$params){
    $supplier = json_decode($params);
    $que = "insert into suplier values (null, '$supplier->nama', '$supplier->alamat', '$supplier->telp')";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return json_encode($result);
}


?>