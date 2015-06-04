(function(){
    var app = angular.module("app");
    app.controller("editSupplierCtrl", ["$scope","$location","item","supplierFactory","toaster", "$modalInstance",
        function($scope,$location,item, supplierFactory, toaster, $modalInstance){
        $scope.judul = "Edit Supplier";
        $scope.itemSup = {
            idsuplier : item.idsuplier,
            nama : item.nama,
            alamat : item.alamat,
            telp : item.telp
        }
        $scope.cancel = function(){
            $modalInstance.dismiss("cancel");
        };
        $scope.simpan = function(){
            supplierFactory.editSupplier(JSON.stringify($scope.itemSup)).
                then(function(){
                    if(supplierFactory.respon==1){
                        toaster.pop("success", "Edit Customer", "Data sudah terupdate");
                        $modalInstance.close("ok");

                    }
                },function(){});
        };
    }]);
}());
