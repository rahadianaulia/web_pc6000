(function(){
    var app = angular.module("app");
    app.controller("detailPembelianCtrl", ["$scope","$location","item","pembelianFactory", "$modalInstance",
        function($scope,$location,item, pembelianFactory, $modalInstance){
        
        $scope.respons = pembelianFactory;
        $scope.tanggal = item.tanggal;
        $scope.namaSupplier = item.namaSupplier;

        $scope.totalBeli = function(){
            var total=0;
            for (var i=0; i<$scope.respons.detailBeli.length; i++){
                total += $scope.respons.detailBeli[i].hargasatuan * $scope.respons.detailBeli[i].jumlah;
            }
            return total;
        };

        pembelianFactory.getDetailBeli("getDetailBeli", item.idbeli).
                then(function(){

                },function(){});

        $scope.cancel = function(){
            $modalInstance.dismiss("cancel");
        };

    }]);
}());
