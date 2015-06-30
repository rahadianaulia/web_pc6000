(function(){
    var app = angular.module("app");
    app.controller("addPenjualanCtrl",["$scope","$location","$modal","toaster","penjualanFactory", function($scope,$location,$modal, toaster,penjualanFactory){
        $scope.respon = penjualanFactory;
        $scope.dataBarang = [];

        var today = new Date();
        $scope.tanggal = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        var customers = function(){
            penjualanFactory.getCustomers().
                then(function(){

                },function(){});
        };
        customers();

        $scope.viewBarang = function(){
            var viewBarang = $modal.open({
                templateUrl:"view/penjualan/dataBarangModal.html",
                controller : "dataBarangModalCtrl",
                backdrop : false
            });

            viewBarang.result.then( function(item){
                $scope.dataBarang.push(item);
            }, function(){

            });
        };

        $scope.getTotalPenjualan = function(){
            var total=0;
            for (var i=0; i < $scope.dataBarang.length; i++){
                total += parseInt($scope.dataBarang[i].hargaJual) * parseInt($scope.dataBarang[i].jumlahJual);
            }
            return total;
        };

        $scope.simpanPenjualan = function(tanggal, namaCustomer){
            var dataJual = {
                "tanggal" : tanggal,
                "idCustomer" : namaCustomer.idcustomer,
                "totalJual" : $scope.getTotalPenjualan(),
                "dataBarang" : $scope.dataBarang
            };
            
            penjualanFactory.simpanPenjualan(JSON.stringify(dataJual)).
                then(function(){
                    console.log(penjualanFactory.messages);
                    clearFields();
                    toaster.pop("succes", "Tambah Data Penjualan", "Data berhasil disimpan!");
                },function(){});
        };

        var clearFields = function(){
            $scope.namacustomer = "";
            $scope.dataBarang = {}
        };

    }]);
}());