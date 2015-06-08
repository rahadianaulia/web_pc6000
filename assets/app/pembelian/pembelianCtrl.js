(function(){
    var app = angular.module("app");
		
    var pembelianCtrl = function($scope,$routeParams,$location, pembelianFactory){
        $scope.respons = pembelianFactory;
		$scope.messageSuccess = false;
		$scope.showFormInputJenis = false;
		$scope.disableJenis = false;
		$scope.listDataBarang = [];

		//get total pembelian
		$scope.getTotalPembelian = function(){
			var total=0;
			for (var i=0; i < $scope.listDataBarang.length; i++){
				total += parseInt($scope.listDataBarang[i].hargasatuan);
			}
			return total;
		};

		//get data supplier
		var getSupplier = function(){
			pembelianFactory.getDataSupplier("getSupplier").
                then(function () {

                }, function () {
                    
                });
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
			$scope.getTotalPembelian();
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
			var masterBeli = {
				"tanggal": pembelian.tanggal,
				"idSupplier": pembelian.supplier.idsuplier,
				"totalBeli": totalBeli
			};

			pembelianFactory.getData("tambahPembelian", JSON.stringify(masterBeli)).
				then(function(){

				}, function(){
				
				});

			for (var i=0; i<dataBarang.length; i++){
				var dataPembelian = {
					"kodeBarang": dataBarang[i].kode,
					"hargaSatuan": dataBarang[i].hargasatuan,
					"jumlah": dataBarang[i].jumlahstok,
					"satuan": dataBarang[i].satuan
				};

				var masterBarang = {
					"kodeBarang": dataBarang[i].kode,
					"namaBarang": dataBarang[i].nama,
					"idJenis": dataBarang[i].jenisid,
					"hargaSatuan": dataBarang[i].hargasatuan,
					"hargaJual": dataBarang[i].hargajual,
					"jumlah": dataBarang[i].jumlahstok,
					"satuan": dataBarang[i].satuan,
					"stockMin": dataBarang[i].stockmin
				};

				pembelianFactory.getData("tambahMasterBarang", JSON.stringify(masterBarang)).
				then(function(){

				}, function(){
				
				});

				pembelianFactory.getData("tambahDetailPembelian", JSON.stringify(dataPembelian)).
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