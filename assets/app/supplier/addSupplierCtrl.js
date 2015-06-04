(function(){
    var app = angular.module("app");
    app.controller("addSupplierCtrl",["$scope","$location","supplierFactory","toaster",
        function($scope,$location, supplierFactory, toaster){
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
                  toaster.pop("success", "Tambah Supplier", '"' + $scope.supplier.nama + '" berhasil ditambahkan.');
                 emptyForm();
              }, function(){

              });
        }

    }]);
}());