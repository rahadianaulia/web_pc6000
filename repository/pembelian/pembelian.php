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
	if ($action == "getDataBarang"){
		echo GetDataBarang($conn_db);
	}
	if ($action == "getPembelian"){
		echo GetPembelian($conn_db);
	}
	if ($action == "getDetailBeli"){
		echo GetDetailBeli($conn_db, $params);
	}
}

function GetDetailBeli($cnn, $params){
	$que="SELECT detailbeli.idbarang, masterbarang.namabarang, jenisbarang.namajenis, detailbeli.hargasatuan, detailbeli.jumlah, detailbeli.satuan FROM detailbeli JOIN masterbarang ON detailbeli.idbarang=masterbarang.idbarang JOIN jenisbarang ON masterbarang.idjenis=jenisbarang.idjenis WHERE detailbeli.idbeli=$params";
	$result = mysqli_query($cnn, $que);
	$arr = [];
	while ($rows = mysqli_fetch_assoc($result)) {
		$arr[] = $rows;
	}
	mysqli_close($cnn);
	return json_encode($arr);
}

function GetPembelian($cnn){
	$que="select masterbeli.idbeli, masterbeli.tglbeli, masterbeli.idsuplier, suplier.nama, masterbeli.totalbeli from masterbeli join suplier on masterbeli.idsuplier=suplier.idsuplier";
	$result = mysqli_query($cnn, $que);
	$arr = [];
	while ($rows = mysqli_fetch_assoc($result)) {
		$arr[] = $rows;
	}
	mysqli_close($cnn);
	return json_encode($arr);
}

function GetDataBarang($cnn){
	$que="select masterbarang.idbarang, masterbarang.namabarang, masterbarang.idjenis, jenisbarang.namajenis, masterbarang.hargasatuan, masterbarang.hargajual, masterbarang.jumlahstock, masterbarang.satuan, masterbarang.stockmin from masterbarang join jenisbarang on masterbarang.idjenis=jenisbarang.idjenis";
	$result = mysqli_query($cnn, $que);
	$arr = [];
	while ($rows = mysqli_fetch_assoc($result)) {
		$arr[] = $rows;
	}
	mysqli_close($cnn);
	return json_encode($arr);
}

function TambahMasterBarang($cnn, $params){
	$param=json_decode($params);
	// $que="insert into masterbarang values('$param->kode', '$param->nama', $param->jenisid, $param->hargasatuan, $param->hargajual, $param->jumlahstok, '$param->satuan', $param->stockmin)";
	$que = "call sp_addBarang('$param->kode', '$param->nama', $param->jenisid, $param->hargasatuan, $param->hargajual, $param->jumlahstok, '$param->satuan', $param->stockmin)";
	$result=mysqli_query($cnn, $que);
	// mysqli_close($cnn);
	return $result;
}

function TambahDetailPembelian($cnn, $params){
	$param=json_decode($params);
	$que="insert into detailbeli values((SELECT MAX(idbeli) FROM masterbeli), '$param->kode', $param->jumlahstok, $param->hargasatuan, '$param->satuan')";
	$result=mysqli_query($cnn, $que);
	// mysqli_close($cnn);
	return $result;
}

function TambahPembelian($cnn, $params){
	$param=json_decode($params);
	$que="insert into masterbeli values(NULL, '$param->tanggal', $param->idSupplier, $param->totalBeli)";
	$result=mysqli_query($cnn, $que);
	

	for ($i=0;$i<sizeof($param->dataBarang);$i++){
		echo TambahMasterBarang($cnn, json_encode($param->dataBarang[$i]));
		echo TambahDetailPembelian($cnn, json_encode($param->dataBarang[$i]));
	}

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