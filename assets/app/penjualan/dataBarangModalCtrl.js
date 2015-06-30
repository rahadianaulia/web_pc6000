(function(){
    var app = angular.module("app");
		
    var dataBarangModalCtrl = function($scope,$routeParams,$location, penjualanFactory, $modalInstance){
        $scope.respon = penjualanFactory;

        var getDataBarang = function(){
            penjualanFactory.getDataBarang().
                then(function(){

                },function(){});
        };
        getDataBarang();

        $scope.cancelTambahBarang = function(){
        	$modalInstance.dismiss('cancel');
        };

        $scope.tambahDataBarang = function(){
            var item = {
                "kodeBarang" : $scope.barang.kode,
                "namaBarang" : $scope.barang.nama,
                "idJenis" : $scope.barang.idjenis,
                "namaJenis" : $scope.barang.namajenis,
                "satuan" : $scope.barang.satuan,
                "hargaJual" : $scope.barang.hargajual,
                "jumlahJual" : $scope.barang.jumlahjual
            };
        	$modalInstance.close(item);
        };

        $scope.cariBarang = function(itemBarang){
            $scope.barang.nama = itemBarang.namabarang;
            $scope.barang.idjenis = itemBarang.idjenis;
            $scope.barang.namajenis = itemBarang.namajenis;
            $scope.barang.satuan = itemBarang.satuan;
            $scope.barang.hargajual = itemBarang.hargajual;

            //disable field
            $scope.namaBarangDisable = true;
            $scope.idJenisDisable = true;
            $scope.namaJenisDisable = true;
            $scope.satuanDisable = true;
            $scope.hargaJualDisable = true;
        };
    };

    app.controller("dataBarangModalCtrl",["$scope", "$routeParams","$location","penjualanFactory", "$modalInstance", dataBarangModalCtrl]);
}());