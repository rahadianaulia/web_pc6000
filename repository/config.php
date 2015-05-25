
<?php
<<<<<<< HEAD
$conn_db = mysqli_connect("localhost","root","","pc6000","3306") or die("Error " . mysqli_error($conn_db));
=======
$conn_db=mysql_connect("localhost","root","");
$konek=mysql_select_db("pc6000",$conn_db);
if ($konek){
	echo "konek";
} else{
	echo "putus";
}

>>>>>>> bb04911b5aa02c6ea8dd41b3945655bf40c2dad4
?>