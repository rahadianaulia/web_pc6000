<?php

include_once("../config.php");

if(isset($_POST["params"])){
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];
    if($action == "getByIdPerbaikan"){
        echo GetByIdPerbaikan($conn_db, $params);
    }
    if($action == "add"){
        echo AddDetailPerbaikan($conn_db,$params);
    }
    if($action == "delete"){
        echo DeleteDetailPerbaikan($conn_db,$params);
    }
}

function GetByIdPerbaikan($cnn, $params){
    $que = "select * from detailperbaikan where idperbaikan = $params->idperbaikan";
    $result = mysqli_query($cnn, $que);
    $arr = [];
    while($rows = mysqli_fetch_assoc($result)){
        $arr[] = $rows;
    }
    mysqli_close($cnn);
    return json_encode($arr);
}


function AddDetailPerbaikan($cnn,$params){
    $obj = json_decode($params);
    $que = "insert into detailperbaikan values ($obj->idperbaikan, '$obj->idbarang', $obj->hargabarang, $obj->hargajasa)";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return $result;
}

function DeleteDetailPerbaikan($cnn,$params){
    $obj = json_decode($params);
    $que = "delete from detailperbaikan where idperbaikan = $obj->idperbaikan AND
            idbarang -> $obj->idbarang AND
            hargabarang = $obj->hargabarang AND
            hargajasa = $obj->hargajasa";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
function DeleteById($cnn,$params){
    $obj = json_decode($params);
    $que = "delete from detailperbaikan where idperbaikan = $obj->idperbaikan";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}


?>