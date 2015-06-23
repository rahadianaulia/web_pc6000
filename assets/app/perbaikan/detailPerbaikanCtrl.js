(function () {
    var app = angular.module("app");
    app.controller("detailPerbaikanCtrl", ["$scope", "perbaikanFactory", "$modal","detailPerbaikanFactory",
        function ($scope, perbaikanFactory, $modal,detailPerbaikanFactory) {
            $scope.objPerbaikan = perbaikanFactory.objPerbaikan;
            $scope.disableInput = true;
            $scope.listDetail = detailPerbaikanFactory;
            $scope.tambahDetail = function () {
                var addDetail = $modal.open({
                    templateUrl: "view/perbaikan/addDetailPerbaikanPartial.html",
                    controller : "addDetailModalCtrl",
                    backdrop: false
                });
            };
        }]);
}());