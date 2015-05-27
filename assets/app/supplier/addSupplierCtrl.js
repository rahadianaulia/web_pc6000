(function(){
    var app = angular.module("app");
    app.controller("addSupplierCtrl",["$scope","supplierFactory", function($scope, supplierFactory){
        $scope.status = 0;
        $scope.supplier = {}
        var emptyForm = function(){
            $scope.supplier = {}
        };
        $scope.cancel = function(){
            $location.path("/supplier");
        };
        $scope.save = function(){
          supplierFactory.getData("addSupplier", JSON.stringify($scope.supplier)).
              then(function(){
                 emptyForm();
                  $scope.status = supplierFactory.listSupplier;
              }, function(){

              });
        }

    }]);
}());