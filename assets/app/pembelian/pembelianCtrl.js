(function(){
    var app = angular.module("app");
		
    var pembelianCtrl = function($scope,$routeParams,$location, pembelianFactory){
        $scope.respons = pembelianFactory;
		$scope.messageSuccess=false;
		$scope.showFormInputJenis=false;
		$scope.disableJenis=false;
		
		$scope.listDataBarang=[];
		
		//tambah data barang
		$scope.tambahDataBarang = function(barang){
			$scope.listDataBarang.push(barang);
			clearFieldsBarang();
		}
		
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