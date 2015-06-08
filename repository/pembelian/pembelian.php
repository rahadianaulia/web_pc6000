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
	if ($action == "getSupplier"){
		echo GetSupplier($conn_db);
	}
	if ($action == "tambahPembelian"){
		echo TambahPembelian($conn_db, $params);
	}
	if ($action == "tambahDetailPembelian"){
		echo TambahDetailPembelian($conn_db, $params);
	}
	if ($action == "tambahMasterBarang"){
		echo TambahMasterBarang($conn_db, $params);
	}
}

function TambahMasterBarang($cnn, $params){
	$param=json_decode($params);
	$que="insert into masterbarang values('$param->kodeBarang', '$param->namaBarang', $param->idJenis, $param->hargaSatuan, $param->hargaJual, $param->jumlah, '$param->satuan', $param->stockMin)";
	$result=mysqli_query($cnn, $que);
	mysqli_close($cnn);
	return $result;
}

function TambahDetailPembelian($cnn, $params){
	$param=json_decode($params);
	$que="insert into detailbeli values((SELECT MAX(idbeli) FROM masterbeli), '$param->kodeBarang', $param->jumlah, $param->hargaSatuan, '$param->satuan')";
	$result=mysqli_query($cnn, $que);
	mysqli_close($cnn);
	return $result;
}

function TambahPembelian($cnn, $params){
	$param=json_decode($params);
	$que="insert into masterbeli values(NULL, '$param->tanggal', $param->idSupplier, $param->totalBeli)";
	$result=mysqli_query($cnn, $que);
	mysqli_close($cnn);
	return $result;
}

function GetSupplier($cnn){
	$que="select * from suplier";
	$result = mysqli_query($cnn, $que);
	$arr = [];
	while ($rows = mysqli_fetch_assoc($result)) {
		$arr[] = $rows;
	}
	mysqli_close($cnn);
	return json_encode($arr);
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