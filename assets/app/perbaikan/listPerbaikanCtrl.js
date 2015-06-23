(function () {
    var app = angular.module("app");
    app.controller("listPerbaikanCtrl", ["$scope", "$routeParams", "perbaikanFactory",
        function ($scope, $routeParams, perbaikanFactory) {
            $scope.listData = perbaikanFactory;
            var init = function () {
                perbaikanFactory.getPerbaikan().then(
                    function () {
                    }, function () {
                    }
                );
            };
            init();
            $scope.panelClass = function(status){
                if(status=="Selesai"){
                    return "panel-grape";
                }
                if(status=="Belum Selesai"){
                    return "panel-danger";
                }
                if(status=="Kembali"){
                    return "panel-warning";
                }
            };
            $scope.status = $routeParams.status;
            $scope.tglMasuk = $routeParams.tgl;
        }]);
}());