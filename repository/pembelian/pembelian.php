<?php
include_once("../config.php");
if(isset($_POST["params"])){
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];
	if ($action == "tambahJenis"){
		echo TambahJenis($conn_db,$params);
	}
	if ($action == "getJenis"){
		echo GetJenis($conn_db);
	}    
}


function TambahJenis($cnn,$params){
	$param=array_shift($params);
	$que = "insert into jenisbarang(namajenis) values('$param')";
	$result=mysqli_query($cnn, $que);
	mysqli_close($cnn);
	return $result;
}

function GetJenis($cnn){
	$que="select * from jenisbarang";
	$result=mysqli_query($cnn, $que);
	$arr=[];
	while($rows=mysqli_fetch_assoc($result)){
		$arr[]=$rows;
	}
	mysqli_close($cnn);
	return json_encode($arr);
}

?>