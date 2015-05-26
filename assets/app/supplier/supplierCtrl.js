(function(){
    var app = angular.module("app");
		
    var supplierCtrl = function($scope,$routeParams,$location, supplierFactory){
        $scope.respons = supplierFactory;

		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 5;
		$scope.numPerPage = 5;

        var getSupplier = function () {
            supplierFactory.getData("getSupplier", undefined).
                then(function () {
					$scope.totalItems=$scope.respons.listSupplier.length;
                }, function () {
                    console.log("Error");
                });
        };
        if($location.path() === "/supplier"){
            getSupplier();
        }
        $scope.edit= function(item){
            supplierFactory.objSupplier = item;
        };
    };
    app.controller("supplierCtrl",["$scope", "$routeParams","$location","supplierFactory", supplierCtrl]);
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