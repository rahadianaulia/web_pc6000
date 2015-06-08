<?php
include_once("../config.php");

if(isset($_POST["params"])){
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];
    if($action == "getAll"){
        echo GetBeli($conn_db);
    }
    if($action == "getById"){
        echo GetBeliById($conn_db,$params);
    }
    if($action == "getByTgl"){
        echo GetBeliByTgl($conn_db,$params);
    }
    if($action == "add"){
        echo AddBeli($conn_db,$params);
    }
    if($action == "delete"){
        echo DeleteBeli($conn_db,$params);
    }
    if($action == "update"){
        echo UpdateBeli($conn_db, $params);
    }
}

function GetBeli($cnn){
    $que = "select * from masterbeli";
    $result = mysqli_query($cnn, $que);
    $arr = [];
    while($rows = mysqli_fetch_assoc($result)){
        $arr[] = $rows;
    }
    mysqli_close($cnn);
    return json_encode($arr);
}

function GetBeliById($cnn,$params){
    $param = json_decode($params);
    $que = "select * from masterbeli where idbeli=$param->idbeli";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function GetBeliByTgl($cnn,$params){
    $param = json_decode($params);
    $que = "select * from masterbeli where tglbeli BETWEEN $param->tglbeliAwal AND $params->tglbeliAkhir";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function AddBeli($cnn,$params){
    $obj = json_decode($params);
    $que = "insert into masterbeli(tglbeli, idsuplier, hutang) values (curdate(), $obj->idsuplier, $obj->hutang)";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return $result;
}


function DeleteBeli($cnn,$params){
    $obj = json_decode($params);
    $que = "delete from masterbeli where idbeli = $obj->idbeli";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
function UpdateBeli($cnn,$params){
    $obj = json_decode($params);
    $que = "update masterbeli set idsuplier=$obj->idsuplier, hutang=$obj->hutang  where idbeli = $obj->idbeli";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
?>