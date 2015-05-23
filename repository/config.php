<?php
$conn_db=mysql_connect("localhost","root","");
$konek=mysql_select_db("pc6000",$conn_db);
if ($konek){
	echo "konek";
} else{
	echo "putus";
}
?>