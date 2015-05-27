(function(){
    var app = angular.module("app");
		
    var supplierCtrl = function($scope,$routeParams,$location, supplierFactory){
        $scope.respons = supplierFactory;
		$scope.messageSuccess=false;

		//initial variable for pagination
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 5;
		$scope.numPerPage = 5;

		//get data supplier
        var getSupplier = function () {
            supplierFactory.getData("getSupplier", undefined).
                then(function () {
					$scope.totalItems=$scope.respons.listSupplier.length;
                }, function () {
                    console.log("Error");
                });
        };
		
		//clear field
		var clearFields=function(){
			$scope.supplier.nama="";
			$scope.supplier.alamat="";
			$scope.supplier.telp="";
		}
		
		//get location
        if($location.path() === "/supplier"){
            getSupplier();
        }
		
		//edit supplier
        $scope.edit= function(item){
            supplierFactory.objSupplier = item;
        };
		
		//add supplier
		$scope.simpanSupplier=function(supplier){
			supplierFactory.getData("addSupplier", JSON.stringify(supplier)).
				then(function(){
					$scope.messageSuccess=true;
					clearFields();
				}, function(){
				
				});
		}
    };
    app.controller("supplierCtrl",["$scope", "$routeParams","$location","supplierFactory", supplierCtrl]);

}());