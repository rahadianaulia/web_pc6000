<?php
    include_once("../config.php");
if(isset($_POST["params"])){
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];
    if($action == "getAll"){
        echo GetCustomer($conn_db);
    }
    if($action == "getById"){
        echo GetCustomerById($conn_db,$params);
    }
    if($action == "add"){
        echo AddCustomer($conn_db,$params);
    }
    if($action == "delete"){
        echo DeleteCustomer($conn_db,$params);
    }
    if($action == "update"){
        echo UpdateCustomer($conn_db, $params);
    }
}
//echo GetCustomer($conn_db);
function GetCustomer($cnn){
    $que = "select * from customer";
    $result = mysqli_query($cnn, $que);
    $arr = [];
    while($rows = mysqli_fetch_assoc($result)){
        $arr[] = $rows;
    }
    mysqli_close($cnn);
    return json_encode($arr);
}

function GetCustomerById($cnn,$params){
    $param = json_decode($params);
    $que = "select * from customer where idcustomer=$param->idcustomer";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function AddCustomer($cnn,$params){
    $obj = json_decode($params);
    $que = "insert into customer(nama, alamat) values ('$obj->nama', '$obj->alamat')";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return $result;
}


function DeleteCustomer($cnn,$params){
    $obj = json_decode($params);
    $que = "delete from customer where idcustomer = $obj->idcustomer";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
function UpdateCustomer($cnn,$params){
    $obj = json_decode($params);
    $que = "update customer set nama='$obj->nama', alamat='$obj->alamat'  where idcustomer = $obj->idcustomer";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}

?>