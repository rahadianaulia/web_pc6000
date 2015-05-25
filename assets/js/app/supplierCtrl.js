(function(){
    var app = angular.module("app");
    var supplierCtrl = function($scope,$routeParams,$location, supplierFactory){
        $scope.respons = supplierFactory;
        var getSupplier = function () {
            supplierFactory.getData("getSupplier", undefined).
                then(function () {
                    console.log($scope.respons);
                }, function () {
                    console.log("Error");
                });

        };
        $scope.addSupplier = function(supplier){
            var data = {"id":undefined, "nama" : supplier.nama,"alamat" : supplier.alamat, "telp" : supplier.telp };
            supplierFactory.getData("addSupplier", JSON.stringify(data)).
                then(function(){},function(){});
        };

        $scope.editSupplier = function(supplier){
            var data = {"id":undefined, "nama" : supplier.nama,"alamat" : supplier.alamat, "telp" : supplier.telp };
            supplierFactory.getData("editSupplier", JSON.stringify(data)).
                then(function(){},function(){});
        };

        $scope.getSupplierById = function(supplier){
            var data = {"id":undefined, "nama" : supplier.nama,"alamat" : supplier.alamat, "telp" : supplier.telp };
            supplierFactory.getData("getSupplierById", JSON.stringify(data)).
                then(function(){}, function(){});
        };
        if($location.path() === "/supplier"){
            getSupplier();
        }



        $scope.fillForm= function(item){
            supplierFactory.objSupplier = item;
        };
        console.log($location.path());
    };
    app.controller("supplierCtrl",["$scope", "$routeParams","$location","supplierFactory", supplierCtrl]);
}());