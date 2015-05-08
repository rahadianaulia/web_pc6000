<?
ob_start();
session_start();
include("inc/config.php");
if ($do=="add_category"){
	$get_category=$_POST["category"];
	$insert=mysql_query("insert into kategori(kategori, username) values('$get_category','".$_SESSION["user"]."')");
	if ($insert){
		header( 'Location: http://localhost/ashfa/admin.php?page=add_category.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=add_category.php&wrong=true' );
	}
} else if ( $do=="add_merk"){
	$get_merk=$_POST["merk"];
	$path=$_FILES["logo"]["name"];
	$insert=mysql_query("insert into merk(merk, pict, username) values('$get_merk','$path','".$_SESSION["user"]."')");
	include("inc/upload_logo.php");
	if ($insert){
		header( 'Location: http://localhost/ashfa/admin.php?page=add_merk.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=add_merk.php&wrong=true' );
	}
} else if ($do=="add_products"){
	$get_category=$_POST["category"];
	$get_merk=$_POST["merk"];
	$get_code=$_POST["code"];
	$get_color=$_POST["color"];
	$get_desc=$_POST["desc"];
	$get_price=$_POST["price"];
	$get_pict=$_FILES["pict"]["name"];
	
	$cari_id_merk=mysql_query("select id_merk from merk where merk='".$get_merk."' and username='".$_SESSION["user"]."'");
	$view_id_merk=mysql_fetch_array($cari_id_merk);
	$id_merk=$view_id_merk[0];
	
	$cari_id_category=mysql_query("select id_kategori from kategori where kategori='".$get_category."' and username='".$_SESSION["user"]."'");
	$view_id_category=mysql_fetch_array($cari_id_category);
	$id_category=$view_id_category[0];
	
	$insert=mysql_query("insert into produk(id_kategori, id_merk, kode, warna, deskripsi, harga, pict, username) values('$id_category','$id_merk','$get_code','$get_color','$get_desc','$get_price','$get_pict','".$_SESSION["user"]."')");
	include("inc/upload_sepatu.php");
	if($insert){
		header( 'Location: http://localhost/ashfa/admin.php?page=add_product.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=add_product.php&wrong=true' );
	}
} else if ($do=="update_contacts"){
	$get_alamat=$_POST["alamat"];
	$get_hp1=$_POST["hp1"];
	$get_hp2=$_POST["hp2"];
	$get_bbm=$_POST["bbm"];
	$get_twitter=$_POST["twitter"];
	$get_whatsapp=$_POST["whatsapp"];
	$get_line=$_POST["line"];
	$get_instagram=$_POST["instagram"];
	$get_yahoo=$_POST["yahoo"];
	$get_email=$_POST["email"];
	
	$update=mysql_query("update contacts set alamat='$get_alamat', hp1='$get_hp1', hp2='$get_hp2', bbm='$get_bbm', twitter='$get_twitter', whatsapp='$get_whatsapp', line='$get_line', instagram='$get_instagram', yahoo='$get_yahoo', email='$get_email' where username='".$_SESSION["user"]."'");
	if ($update){
		header( 'Location: http://localhost/ashfa/admin.php?page=edit_contact.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=edit_contact.php&wrong=true' );
	}
} else if ($do=="edit_howtoorder"){
	$get_howtoorder=$_POST["wysiwyg"];
	$update_order=mysql_query("update contacts set orders='$get_howtoorder' where username='".$_SESSION["user"]."'");
	if ($update_order){
		header( 'Location: http://localhost/ashfa/admin.php?page=edit_howtoorder.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=edit_howtoorder.php&wrong=true' );
	}
} else if ($do=="edit_category"){
	$category=$_POST["category"];
	$update=mysql_query("update kategori set kategori='$category' where id_kategori=$id and username='".$_SESSION["user"]."'");
	if ($update){
		header( 'Location: http://localhost/ashfa/admin.php?page=show_category.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=show_category.php&wrong=true' );
	}
} else if ($do=="delete_category"){
	$delete=mysql_query("delete from kategori where id_kategori=$id and username='".$_SESSION["user"]."'");
	if ($delete){
		header( 'Location: http://localhost/ashfa/admin.php?page=show_category.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=show_category.php&wrong=true' );
	}
} else if ($do=="edit_merk"){
	$query_merk=mysql_query("select * from merk where id_merk='$id' and username='".$_SESSION["user"]."'");
	$view_merk=mysql_fetch_array($query_merk);
	$pictOld=$view_merk[pict];
	
	$pict=$_FILES["logo"]["name"];
	$merk=$_POST["merk"];
	if ($pict != ""){	
		$update=mysql_query("update merk set merk='$merk', pict='$pict' where id_merk='$id' and username='".$_SESSION["user"]."'");
		unlink($_SESSION["user"]."/merk/".$pictOld);
		include("inc/upload_logo.php");
		if ($update){
			header( 'Location: http://localhost/ashfa/admin.php?page=show_merk.php&wrong=false' );
		} else {
			header( 'Location: http://localhost/ashfa/admin.php?page=show_merk.php&wrong=true' );
		}
	} else {
		$update=mysql_query("update merk set merk='$merk' where id_merk='$id' and username='".$_SESSION["user"]."'");
		if ($update){
			header( 'Location: http://localhost/ashfa/admin.php?page=show_merk.php&wrong=false' );
		} else {
			header( 'Location: http://localhost/ashfa/admin.php?page=show_merk.php&wrong=true' );
		}
	}
} else if ($do=="delete_merk"){
	$query_merk=mysql_query("select * from merk where id_merk='$id' and username='".$_SESSION["user"]."'");
	$view_merk=mysql_fetch_array($query_merk);
	$pictOld=$view_merk[pict];
	unlink($_SESSION["user"]."/merk/".$pictOld);
	
	$delete=mysql_query("delete from merk where id_merk=$id and username='".$_SESSION["user"]."'");
		
	if ($delete){
		header( 'Location: http://localhost/ashfa/admin.php?page=show_merk.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=show_merk.php&wrong=true' );
	}
} else if ($do=="edit_header"){
	$header=$_FILES["logo"]["name"];
	if ($header != "" && $_FILES["logo"]["type"]=="image/png"){
		unlink($_SESSION["user"]."/images/header.png");
		include("inc/upload_header.php");
		header( 'Location: http://localhost/ashfa/admin.php?page=edit_header.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=edit_header.php&wrong=true' );
	}
} else if ($do=="edit_product"){
	$category=$_POST["category"];
	$merk=$_POST["merk"];
	$code=$_POST["code"];
	$color=$_POST["color"];
	$desc=$_POST["desc"];
	$price=$_POST["price"];
	$pict=$_FILES["pict"]["name"];
	
	$cari_id_merk=mysql_query("select id_merk from merk where merk='".$merk."' and username='".$_SESSION["user"]."'");
	$view_id_merk=mysql_fetch_array($cari_id_merk);
	$id_merk=$view_id_merk[0];
	
	$cari_id_category=mysql_query("select id_kategori from kategori where kategori='".$category."' and username='".$_SESSION["user"]."'");
	$view_id_category=mysql_fetch_array($cari_id_category);
	$id_category=$view_id_category[0];
	
	if ($pict!=""){
		$cari_pict=mysql_query("select pict from produk where id='$id' and username='".$_SESSION["user"]."'");
		$data_pict=mysql_fetch_array($cari_pict);
		$pictOld=$data_pict[pict];
		
		$update=mysql_query("update produk set id_kategori=$id_category, id_merk=$id_merk, kode='$code', warna='$color', deskripsi='$desc', harga=$price, pict='$pict' where id=$id and username='".$_SESSION["user"]."'");
		unlink($_SESSION["user"]."/catalog/".$pictOld);
		unlink($_SESSION["user"]."/catalog/thumbnails/thumb_".$pictOld);
		include("inc/upload_sepatu.php");
		
		if ($update){
			header( 'Location: http://localhost/ashfa/admin.php?page=show_products.php&wrong=false' );
		} else {
			header( 'Location: http://localhost/ashfa/admin.php?page=show_products.php&wrong=true' );
		}
	} else {
		$update=mysql_query("update produk set id_kategori=$id_category, id_merk=$id_merk, kode='$code', warna='$color', deskripsi='$desc', harga=$price where id=$id and username='".$_SESSION["user"]."'");
		if ($update){
			header( 'Location: http://localhost/ashfa/admin.php?page=show_products.php&wrong=false' );
		} else {
			header( 'Location: http://localhost/ashfa/admin.php?page=show_products.php&wrong=true' );
		}
	}
} else if ($do=="delete_product"){
	$dataLama=mysql_query("select * from produk where id='$id' and username='".$_SESSION["user"]."'");
	$data=mysql_fetch_array($dataLama);
	$pictLama=$data[pict];
	
	$delete=mysql_query("delete from produk where id='$id' and username='".$_SESSION["user"]."'");
	unlink($_SESSION["user"]."/catalog/".$pictLama);
	unlink($_SESSION["user"]."/catalog/thumbnails/thumb_".$pictLama);
	
	if ($delete){
		header( 'Location: http://localhost/ashfa/admin.php?page=show_products.php&wrong=false' );
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=show_products.php&wrong=true' );
	}
} else if ($do=="logout"){
	session_start();
	unset($_SESSION["user"]);
	unset($_SESSION["sesi"]);
	header('Location: http://localhost/ashfa/index.php');
} else if ($do=="change_password"){
	$oldPass=$_POST["oldPass"];
	$newPass=$_POST["newPass"];
	$confirmPass=$_POST["confirmPass"];
	
	$query=mysql_query("select passwd from admin where username='".$_SESSION["user"]."'");
	$dataPassLama=mysql_fetch_array($query);
	$passLama=$dataPassLama[passwd];
	
	if ($oldPass==$passLama && $newPass==$confirmPass){
		$sesi=md5($_SESSION["user"].$newPass);
		$change=mysql_query("update admin set passwd='$newPass', sesi='$sesi' where username='".$_SESSION["user"]."'");
		if ($change){
			header( 'Location: http://localhost/ashfa/admin.php?page=change_password.php&wrong=false' );
		} else {
			header( 'Location: http://localhost/ashfa/admin.php?page=change_password.php&wrong=true' );
		}
	} else {
		header( 'Location: http://localhost/ashfa/admin.php?page=change_password.php&wrong=true' );
	}
}
?>