(function(){
    var app = angular.module("app");
    app.controller("editBarangCtrl", ["$scope","$location","barangFactory", function($scope,$location, barangFactory){
        //html5Mode(true);
		$scope.respons=barangFactory;
        $scope.itemBarang = barangFactory.objBarang;
		
		
        $scope.simpan = function(databarang){
            barangFactory.getData("updateBarang",JSON.stringify(databarang)).
                then(function(){
                    if(barangFactory.listBarang==1){
                        alert("Update Berhasil");
                        $location.path("/barang");
                    }
                },function(){});
        };
		
		//get data jenis barang
		var getDataJenis=function(){
			barangFactory.getData("getJenis", undefined).
				then(function(){
					$scope.itemBarang.jenis=$scope.itemBarang.idjenis;
				}, function(){
				
				});
		};
		
		//check location
		if ($location.path() === "/barang/edit"){
			getDataJenis();
		}
    }]);
}());
