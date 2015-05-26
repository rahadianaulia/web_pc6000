<?php
include_once("../config.php");
if(isset($_POST["params"])){
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
    if($action == "deleteSupplier"){
        echo DeleteSupplier($conn_db,$params);
    }
    if($action == "updateSupplier"){
        echo UpdateSupplier($conn_db, $params);
    }
}

function GetSupplier($cnn){
    $que = "select * from suplier";
    $result = mysqli_query($cnn, $que);
    $arr = [];
    while($rows = mysqli_fetch_assoc($result)){
        $arr[] = $rows;
    }
    mysqli_close($cnn);
    return json_encode($arr);
}

function GetSupplierById($cnn,$params){
    $param = json_decode($params);
    $que = "select * from suplier where idsuplier=$param->idsuplier";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function AddSupplier($cnn,$params){
    $supplier = json_decode($params);
    $que = "insert into suplier(nama, alamat, telp) values ('$supplier->nama', '$supplier->alamat', '$supplier->telp')";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return $result;
}


function DeleteSupplier($cnn,$params){
    $supplier = json_decode($params);
    $que = "delete from suplier where idsuplier = $supplier->idsuplier";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
function UpdateSupplier($cnn,$params){
    $supplier = json_decode($params);
    $que = "update suplier set nama='$supplier->nama', alamat='$supplier->alamat', telp = '$supplier->telp'  where idsuplier = $supplier->idsuplier";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}


?>