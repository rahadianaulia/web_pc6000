<?php
include_once("../config.php");

if(isset($_POST["params"])){
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];
    if($action == "getAll"){
        echo GetPenjualan($conn_db);
    }
    if($action == "getByTgl"){
        echo GetPenjualanByTgl($conn_db,$params);
    }
    if($action == "getByNofaktur"){
        echo GetBeliByNofaktur($conn_db,$params);
    }
    if($action == "add"){
        echo AddPenjualan($conn_db,$params);
    }
    if($action == "delete"){
        echo DeletePenjualan($conn_db,$params);
    }
    if($action == "update"){
        echo UpdatePenjualan($conn_db, $params);
    }
}

function GetPenjualan($cnn){
    $que = "select * from penjualan";
    $result = mysqli_query($cnn, $que);
    $arr = [];
    while($rows = mysqli_fetch_assoc($result)){
        $arr[] = $rows;
    }
    mysqli_close($cnn);
    return json_encode($arr);
}

function GetPenjualanByTgl($cnn,$params){
    $param = json_decode($params);
    $que = "select * from penjualan where tgljual BETWEEN $param->tgljualawal AND $params->tgljualakhir";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function GetBeliByNofaktur($cnn,$params){
    $param = json_decode($params);
    $que = "select * from penjualan where no_faktur = '$params->no_faktur'";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function AddPenjualan($cnn,$params){
    $obj = json_decode($params);
    $que = "insert into penjualan(no_faktur, tgljual, idcustomer, totalharga)
            values('$params->no_faktur', curdate(), $obj->idcustomer, $params->totalharga)";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return $result;
}

function DeletePenjualan($cnn,$params){
    $obj = json_decode($params);
    $que = "delete from penjualan where no_faktur = $obj->no_faktur";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
function UpdatePenjualan($cnn,$params){
    $obj = json_decode($params);
    $que = "update penjualan set idcustomer=$obj->idcustomer, totalharga=$obj->totalharga  where no_faktur = '$obj->no_faktur'";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
?>