/**
 * Created by skylab on 21/05/2015.
 */
(function () {
    var app = angular.module("app");
    var appCtrl = function ($scope, $location, supplierFactory) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.factoryRespon = supplierFactory;


        $scope.updateSupplier = function (supplier) {
            var data = {"id": 2, "nama":supplier.nama,"alamat":supplier.alamat,"telp":supplier.telp};
            supplierFactory.getData("updateSupplier", JSON.stringify(data)).
                then(function () {
                    console.log(data);
                    console.log($scope.factoryRespon);
                }, function () {
                    console.log("Error");
                });

        };

        $scope.simpanSupplier = function (supplier) {
            $scope.nama = supplier.nama;
            $scope.alamat = supplier.alamat;
            $scope.telp = supplier.telp;
        };


    };
    app.controller("appCtrl", ["$scope", "$location", "supplierFactory", appCtrl]);
}());