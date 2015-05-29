(function(){
    var app = angular.module("app");
		
    var barangCtrl = function($scope,$routeParams,$location, barangFactory){
        $scope.respons = barangFactory;
		$scope.messageSuccess=false;
		
		//initial variable for pagination
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 5;
		$scope.numPerPage = 5;

		//get data barang
        var getBarang = function () {
            barangFactory.getData("getBarang", undefined).
                then(function () {
					$scope.totalItems=$scope.respons.listBarang.length;
					console.log($scope.respons.listBarang);
                }, function () {
                    console.log("Error");
                });
        };
		
		//get data jenis barang
		var getDataJenis=function(){
			barangFactory.getData("getJenis", undefined).
				then(function(){
					
				}, function(){
				
				});
		};
		
		//clear fields
		var clearFields=function(){
			$scope.barang.kode="";
			$scope.barang.nama="";
			$scope.barang.hargasatuan="";
			$scope.barang.hargajual="";
			$scope.barang.jumlahstok="";
			$scope.barang.stokminimal="";
			$scope.barang.satuan="";	
		}
		
		//check location
        if($location.path() === "/barang"){
            getBarang();
        } else if ($location.path() === "/barang/add" || $location.path() === "/barang/add#myModal"){
			getDataJenis();
		}
		
		//edit barang
        $scope.edit= function(item){
            barangFactory.objBarang = item;
        };
		
		//tambah jenis barang
		$scope.tambahJenis=function(jenis){
			barangFactory.getData("tambahJenis", jenis).
				then(function(){
					$scope.jenis.jenisbarang="";
					alert("data telah ditambah");
					getDataJenis();
				}, function(){
				
				});
		};
		
		//simpan barang
		$scope.simpanBarang=function(barang){
			barangFactory.getData("addBarang", JSON.stringify(barang)).
				then(function(){
					getDataJenis();
					$scope.messageSuccess=true;
					clearFields();
				}, function(){
				
				});
		};
    };
    app.controller("barangCtrl",["$scope", "$routeParams","$location","barangFactory", barangCtrl]);
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