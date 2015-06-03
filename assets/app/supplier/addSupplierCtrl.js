(function(){
    var app = angular.module("app");
    app.controller("addSupplierCtrl",["$scope","$location","supplierFactory", function($scope,$location, supplierFactory){
        $scope.messageSuccess = 0;
        $scope.supplier = {}
        var emptyForm = function(){
            $scope.supplier = {}
        };
        $scope.cancel = function(){
            $location.path("/supplier");
        };
        $scope.save = function(){
          supplierFactory.addSupplier( JSON.stringify($scope.supplier)).
              then(function(){
                 emptyForm();
                  $scope.messageSuccess = supplierFactory.listSupplier;
              }, function(){

              });
        }

    }]);
}());