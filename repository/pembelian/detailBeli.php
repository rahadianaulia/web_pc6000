<?php
include_once("../config.php");

if(isset($_POST["params"])){
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];
    if($action == "getDetail"){
        echo GetBeli($conn_db, $params);
    }
    if($action == "getById"){
        echo GetBeliById($conn_db,$params);
    }
    if($action == "add"){
        echo AddDetailBeli($conn_db,$params);
    }
    if($action == "delete"){
        echo DeleteDetailBeli($conn_db,$params);
    }
    if($action == "deleteById"){
        echo DeleteDetailBeliById($conn_db,$params);
    }
}

function GetDetailBeliById($cnn, $params){
    $que = "select * from detailbeli where idbeli = $params->idbeli";
    $result = mysqli_query($cnn, $que);
    $arr = [];
    while($rows = mysqli_fetch_assoc($result)){
        $arr[] = $rows;
    }
    mysqli_close($cnn);
    return json_encode($arr);
}

function AddDetailBeli($cnn,$params){
    $obj = json_decode($params);
    $que = "insert into detailbeli(idbeli, idbarang, jumlah, hargasatuan, satuan)
            values ($obj->idbeli,'$obj->idbarang',$obj->jumlah, $obj->hargastuan, $obj->satuan)";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return $result;
}


function DeleteDetailBeliById($cnn,$params){
    $obj = json_decode($params);
    $que = "delete from detailbeli where idbeli = $obj->idbeli";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}

function DeleteDetailBeli($cnn,$params){
    $obj = json_decode($params);
    $que = "delete from detailbeli where idbeli = $obj->idbeli AND
            idbarang = '$obj->idbarang' AND
            jumlah = $obj->jumlah AND
            hargasatuan = $obj->hargasatuan AND
            satuan = $obj->satuan";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
?>