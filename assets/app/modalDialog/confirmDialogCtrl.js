(function(){
    var app = angular.module("app");
    app.controller("confirmDialogCtrl",["$scope","$modalInstance","header","pesan",function($scope,$modalInstance, header,pesan){
        $scope.judul = header;
        $scope.pesan = pesan;

        $scope.ok = function(){
            $modalInstance.close("ok");
        };
        $scope.cancel = function(){
            $modalInstance.dismiss("cancel");
        };
    }]);
}());