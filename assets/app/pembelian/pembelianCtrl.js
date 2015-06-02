(function(){
    var app = angular.module("app");
		
    var pembelianCtrl = function($scope,$routeParams,$location, pembelianFactory){
        $scope.respons = pembelianFactory;
		$scope.messageSuccess=false;
		$scope.showFormInputJenis=false;
		$scope.disableJenis=false;
		$scope.listDataBarang=[];
		$scope.totalPembelian=0;

		//get totaL pembelian
		var getTotalPembelian = function(){
			for (var i=0; i < $scope.listDataBarang.length; i++){
				$scope.totalPembelian =  +$scope.listDataBarang[i].hargasatuan;
			}
		};
		
		//tambah data barang
		$scope.tambahDataBarang = function(barang){
			$scope.listDataBarang.push({kode: barang.kode, nama: barang.nama, jenisid: barang.jenis.idjenis, jenisnama: barang.jenis.namajenis, hargasatuan: barang.hargasatuan, hargajual: barang.hargajual, jumlahstok: barang.jumlah, satuan: barang.satuan});
			clearFieldsBarang();
			getTotalPembelian();
		};
		
		//tambah jenis barang
		$scope.simpanJenis=function(jenis){
			pembelianFactory.getData("tambahJenis", jenis).
				then(function(){
					$scope.jenis.jenisbarang="";
					alert("data telah ditambah");
					getDataJenis();
				}, function(){
				
				});
		};
		
		//initial variable for pagination
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 5;
		$scope.numPerPage = 5;

		//get data pembelian
        var getPembelian = function () {
            pembelianFactory.getData("getPembelian", undefined).
                then(function () {
					$scope.totalItems=$scope.respons.listPembelian.length;
					console.log($scope.respons.listPembelian);
                }, function () {
                    console.log("Error");
                });
        };
		
		//get data jenis pembelian
		var getDataJenis=function(){
			pembelianFactory.getData("getJenis", undefined).
				then(function(){
					
				}, function(){
				
				});
		};
		
		//clear fields
		var clearFieldsBarang=function(){
			$scope.barang.kode="";
			$scope.barang.nama="";
			$scope.barang.jenis="Jenis Barang";
			$scope.barang.hargasatuan="0";
			$scope.barang.hargajual="0";
			$scope.barang.jumlah="0";
			$scope.barang.satuan="";
		}
		
		//check location
        if($location.path() === "/pembelian"){
            getPembelian();
        } else if ($location.path() === "/pembelian/add"){
			getDataJenis();
		}
		
		//edit pembelian
        $scope.edit= function(item){
            pembelianFactory.objPembelian = item;
        };
		
		//simpan pembelian
		$scope.simpanPembelian=function(pembelian){
			pembelianFactory.getData("addPembelian", JSON.stringify(pembelian)).
				then(function(){
					getDataJenis();
					$scope.messageSuccess=true;
					clearFields();
				}, function(){
				
				});
		};
    };
    app.controller("pembelianCtrl",["$scope", "$routeParams","$location","pembelianFactory", pembelianCtrl]);
	app.filter('startFrom', function(){
		return function(input, start){
			if (input){
				start = +start;
				return input.slice(start);
			}
			return[];
		}
	});
}());