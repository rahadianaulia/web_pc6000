(function(){
    var app = angular.module("app");
		
    var pembelianCtrl = function($scope,$routeParams,$location, pembelianFactory){
        $scope.respons = pembelianFactory;
		$scope.messageSuccess = false;
		$scope.showFormInputJenis = false;
		$scope.disableJenis = false;
		$scope.listDataBarang = [];
		$scope.totalPembelian = 0;

		//get data supplier
		var getSupplier = function(){
			pembelianFactory.getDataSupplier("getSupplier").
                then(function () {

                }, function () {
                    
                });
		};

		//get totaL pembelian
		var getTotalPembelian = function(){
			for (var i=0; i < $scope.listDataBarang.length; i++){
				$scope.totalPembelian =  +$scope.listDataBarang[i].hargasatuan;
			}
		};
		
		//tambah data barang
		$scope.tambahDataBarang = function(barang){
			$scope.listDataBarang.push({
				kode: barang.kode, 
				nama: barang.nama, 
				jenisid: barang.jenis.idjenis, 
				jenisnama: barang.jenis.namajenis, 
				hargasatuan: barang.hargasatuan, 
				hargajual: barang.hargajual, 
				jumlahstok: barang.jumlahstok,
				stockmin: barang.stockmin, 
				satuan: barang.satuan
			});
			clearFieldsBarang();
			getTotalPembelian();
			$scope.messageSuccess=true;
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
			$scope.barang.jumlahstok="0";
			$scope.barang.satuan="";
			$scope.barang.stockmin="0";
		}
		
		//check location
        if($location.path() === "/pembelian"){
            getPembelian();
        } else if ($location.path() === "/pembelian/add"){
			getDataJenis();
			getSupplier();
		}
		
		//edit pembelian
        $scope.edit= function(item){
            pembelianFactory.objPembelian = item;
        };
		
		//simpan pembelian
		$scope.simpanPembelian=function(pembelian, dataBarang, totalBeli){
			var dataPembelian=[];

			for (var i=0; i<dataBarang.length; i++){
				dataPembelian = {
					"tanggal": pembelian.tanggal, 
					"idSupplier": pembelian.supplier.idsuplier,
					"kodeBarang": dataBarang[i].kode,
					"namaBarang": dataBarang[i].nama,
					"idJenis": dataBarang[i].jenisid,
					"hargaSatuan": dataBarang[i].hargasatuan,
					"hargaJual": dataBarang[i].hargajual,
					"jumlah": dataBarang[i].jumlahstok,
					"stockMin": dataBarang[i].stockmin,
					"satuan": dataBarang[i].satuan,
					"totalBeli": totalBeli
				};

				pembelianFactory.getData("tambahPembelian", JSON.stringify(dataPembelian)).
				then(function(){

				}, function(){
				
				});
			}			
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