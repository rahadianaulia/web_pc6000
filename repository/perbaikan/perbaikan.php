<?php
include_once("../config.php");

if(isset($_POST["params"])){
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];
    if($action == "getAll"){
        echo GetPerbaikan($conn_db);
    }
    if($action == "getByTglMasuk"){
        echo GetPerbaikanByTglMasuk($conn_db,$params);
    }
    if($action == "getByTglKeluar"){
        echo GetPerbaikanByTglMasuk($conn_db,$params);
    }
    if($action == "getByStatusTglMasuk"){
        echo GetPerbaikanByStatus($conn_db,$params);
    }
    if($action == "add"){
        echo AddPerbaikan($conn_db,$params);
//        print_r(AddPerbaikan($conn_db,$params));
    }
    if($action == "delete"){
        echo DeletePerbaikan($conn_db,$params);
    }
    if($action == "update"){
        echo UpdatePerbaikan($conn_db, $params);
    }
    if($action == "edit"){
        echo EditPerbaikan($conn_db, $params);
    }
}

function GetPerbaikan($cnn){
    $que = "SELECT *, nama namacustomer FROM perbaikan
            LEFT JOIN customer USING (idcustomer)";
    $result = mysqli_query($cnn, $que);
    $arr = [];
    while($rows = mysqli_fetch_assoc($result)){
        $arr[] = $rows;
    }
    mysqli_close($cnn);
    return json_encode($arr);
}

function GetPerbaikanByTglMasuk($cnn,$params){
    $param = json_decode($params);
    $que = "select * from perbaikan where tglmasuk BETWEEN $param->tglMasukAwal and $param->tglMasukAkhir";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}
function GetPerbaikanByTglKeluar($cnn,$params){
    $param = json_decode($params);
    $que = "select * from perbaikan where tglmasuk BETWEEN $param->tglKeluarAwal and $param->tglKeluarAkhir";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}
function AddPerbaikan($cnn,$params){
    $obj = json_decode($params);
    $que = "insert into perbaikan(tglmasuk,idcustomer,unit, keteranganrusak, status) values
            (now(),$obj->idcustomer, '$obj->perangkat','$obj->kerusakan', '$obj->status')";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return $result;
}

function UpdatePerbaikan($cnn,$params){
    $obj = json_decode($params);
    $que = "update perbaikan set tglselesai='$obj->tglselesai',
            status='$obj->status',
            keterangankembali = '$obj->keterangankembali',
            total = $obj->total
            where idperbaikan = $obj->idperbaikan";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}

function DeletePerbaikan($cnn,$params){
    $obj = json_decode($params);
    $que = "delete from perbaikan where idperbaikan = $obj->idperbaikan";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
function EditPerbaikan($cnn,$params){
    $obj = json_decode($params);
    $que = "update perbaikan set kerusakan='$obj->kerusakan'  where idkerusakan = $obj->idkerusakan";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}

function getByStatusTglMasuk($cnn, $params){
    $param = json_decode($params);
    $que = "select * from perbaikan where status = '$param->status' and tglmasuk = '$param->tglmasuk'";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

?>