(function () {
    var app = angular.module("app");
    app.controller("addDetailModalCtrl", ["$scope", "detailPerbaikanFactory","$modalInstance",
        function ($scope, detailPerbaikanFactory,$modalInstance) {
            $scope.item = {};
            $scope.add = function (item) {
                var detail = {
                    namaBarang: item.namaBarang,
                    hargaBarang: item.hargaBarang,
                    jasa: item.jasa
                }

                detailPerbaikanFactory.arrDetail.push(detail);
                $scope.item = {};
            };

            $scope.cancel = function(){
                $modalInstance.dismiss("cancel");
            };
        }]);
}());