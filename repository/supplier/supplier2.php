<?php
include_once("../config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($request->params)){
    $params = $request->params;
}

if(isset($request->action)){
    $action = $request->action;
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


function DeleteSupplier($cnn,$params){
    $supplier = json_decode($params);
    $que = "delete from suplier where idsuplier = $supplier->id";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return json_encode($result);
}



function test(){
    $array = [
        "nama" => "Skylab",
        "alamat" => "Padang"
    ];

return json_encode($array);

}

?>