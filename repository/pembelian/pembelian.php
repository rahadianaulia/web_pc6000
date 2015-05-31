<?php
include_once("../config.php");
if(isset($_POST["params"])){
    $params = $_POST["params"];
}
if(isset($_POST["action"])){
    $action = $_POST["action"];
    if($action == "getBarang"){
        echo GetBarang($conn_db);
    }
	if ($action == "tambahJenis"){
		echo TambahJenis($conn_db,$params);
	}
	if ($action == "getJenis"){
		echo GetJenis($conn_db);
	}
	if ($action == "addBarang"){
		echo AddBarang($conn_db,$params);
	}
	if($action == "updateBarang"){
        echo UpdateBarang($conn_db, $params);
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

function GetBarang($cnn){
    $que = "select masterbarang.idbarang, masterbarang.namabarang, masterbarang.idjenis, jenisbarang.namajenis, masterbarang.hargasatuan, masterbarang.hargajual, masterbarang.jumlahstock, masterbarang.stockmin, masterbarang.satuan from masterbarang join jenisbarang on masterbarang.idjenis=jenisbarang.idjenis";
    $result = mysqli_query($cnn, $que);
    $arr = [];
    while($rows = mysqli_fetch_assoc($result)){
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

function AddBarang($cnn,$params){
	$barang=json_decode($params);
	$jenis=json_decode($barang->jenis->idjenis);
	$que="insert into masterbarang values('$barang->kode', '$barang->nama',$jenis,$barang->hargasatuan,$barang->hargajual,$barang->jumlahstok,'$barang->satuan',$barang->stokminimal)";
	$result=mysqli_query($cnn, $que);
	mysqli_close($cnn);
	return $result;
}

function GetSupplierById($cnn,$params){
    $param = json_decode($params);
    $que = "select * from suplier where idsuplier=$param->idsuplier";
    $result = mysqli_query($cnn, $que);
    $rows = mysqli_fetch_array($result,MYSQLI_ASSOC);
    mysqli_close($cnn);
    return json_encode($rows);
}

function AddSupplier($cnn,$params){
    $supplier = json_decode($params);
    $que = "insert into suplier(nama, alamat, telp) values ('$supplier->nama', '$supplier->alamat', '$supplier->telp')";
    $result = mysqli_query($cnn,$que);
    mysqli_close($cnn);
    return $result;
}


function DeleteSupplier($cnn,$params){
    $supplier = json_decode($params);
    $que = "delete from suplier where idsuplier = $supplier->idsuplier";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}
function UpdateBarang($cnn,$params){
    $barang = json_decode($params);
	$jenis=json_decode($barang->jenis->idjenis);
    $que = "update masterbarang set namabarang='$barang->namabarang', idjenis=$jenis, hargasatuan=$barang->hargasatuan, hargajual=$barang->hargajual, jumlahstock=$barang->jumlahstock, satuan='$barang->satuan', stockmin=$barang->stockmin where idbarang = '$barang->idbarang'";
    $result = mysqli_query($cnn, $que);
    mysqli_close($cnn);
    return $result;
}


?>