(function(){
    var app = angular.module("app");
		
    var pembelianCtrl = function($scope,$routeParams,$location,$modal, pembelianFactory, toaster){
        $scope.respons = pembelianFactory;
		$scope.messageSuccess = false;
		$scope.showFormInputJenis = false;
		$scope.disableJenis = false;
		$scope.listDataBarang = [];

		//initial disable field barang
		$scope.namaBarangDisable = false;
		$scope.hargaSatuanDisable = false;
		$scope.hargaJualDisable = false;
		$scope.jumlahStockDisable = false;
		$scope.stockMinimalDisable = false;
		$scope.satuanDisable = false;

		//delete pembelian
		$scope.delete = function(itemToDelete){
            var modalDialog = $modal.open({
                templateUrl : "view/modal/confirmDialog.html",
                controller : "confirmDialogCtrl",
                backdrop : false,
                resolve :{
                    header : function(){
                        return "Konfirmasi";
                    },
                    pesan : function(){
                        return 'Hapus pembelian tanggal: ' + itemToDelete.tglbeli + ', supplier: ' + itemToDelete.nama +' ?';
                    }
                }
            });

            modalDialog.result.then(function(hasil){
                pembelianFactory.deletePembelian("deletePembelian", itemToDelete.idbeli).
                    then(function(){
                        toaster.pop("succes", "Data pembelian tanggal: " + itemToDelete.tglbeli + ', supplier: ' + itemToDelete.nama +' sudah dihapus');
                        getPembelian();
                    },function(){});
            },function(){});
        };

		//view detail pembelian
		$scope.detailPembelian= function(idbeli, tanggal, supplier){
            var detail = $modal.open({
                templateUrl:"view/pembelian/detailPembelianModal.html",
                controller : "detailPembelianCtrl",
                backdrop : false,
                size : 'lg',
                resolve : {
                    item : function(){
                        return { "idbeli":idbeli, "tanggal":tanggal, "namaSupplier":supplier };
                    }
                }
            });
        };

		//search barang by kode barang
		$scope.cariBarang = function(barang){
			$scope.barang.nama=barang.namabarang;
			$scope.barang.jenis={"idjenis":barang.idjenis, "namajenis":barang.namajenis};
			$scope.barang.hargasatuan=barang.hargasatuan;
			$scope.barang.hargajual=barang.hargajual;
			$scope.barang.jumlahstok=barang.jumlahstock;
			$scope.barang.satuan=barang.satuan;
			$scope.barang.stockmin=barang.stockmin;

			//disable field
			$scope.namaBarangDisable = true;
			$scope.hargaSatuanDisable = true;
			$scope.hargaJualDisable = true;
			$scope.stockMinimalDisable = true;
			$scope.satuanDisable = true;
		};

		//get data barang
		var getDataBarang = function(){
			pembelianFactory.getDataBarang("getDataBarang").
                then(function () {

                }, function () {
                    
                });
		};

		//get total pembelian
		$scope.getTotalPembelian = function(){
			var total=0;
			for (var i=0; i < $scope.listDataBarang.length; i++){
				total += parseInt($scope.listDataBarang[i].hargasatuan) * parseInt($scope.listDataBarang[i].jumlahstok);
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

		//reset field barang
		$scope.resetFieldsBarang = function(){
			clearFieldsBarang();
		};
		
		//clear fields
		var clearFieldsBarang=function(){
			$scope.barang.kode="";
			$scope.barang.nama="";
			$scope.barang.jenis="Jenis Barang";
			$scope.barang.hargasatuan="";
			$scope.barang.hargajual="";
			$scope.barang.jumlahstok="";
			$scope.barang.satuan="";
			$scope.barang.stockmin="";

			//enable field barang
			$scope.namaBarangDisable = false;
			$scope.hargaSatuanDisable = false;
			$scope.hargaJualDisable = false;
			$scope.stockMinimalDisable = false;
			$scope.satuanDisable = false;
		};

		//clear field pembelian
		var clearFieldsPembelian = function(){
			$scope.pembelian.tanggal = "";
			$scope.pembelian.supplier = "";
			$scope.listDataBarang = [];
		};
		
		//check location
        if($location.path() === "/pembelian"){
            getPembelian();
        } else if ($location.path() === "/pembelian/add"){
			getDataJenis();
			getSupplier();
			getDataBarang();
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
				"totalBeli": totalBeli,
				"dataBarang": dataBarang
			};

			pembelianFactory.getData("tambahPembelian", JSON.stringify(masterBeli)).
				then(function(){
					toaster.pop("succes", "Tambah Data Pembelian", "Data berhasil disimpan!");
				}, function(){

				});

			clearFieldsPembelian();	
		};
    };

    app.controller("pembelianCtrl",["$scope", "$routeParams","$location","$modal","pembelianFactory","toaster", pembelianCtrl]);

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