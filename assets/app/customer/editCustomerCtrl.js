(function(){
    var app = angular.module("app");
    app.controller("editCustomerCtrl",["$scope","$location","toaster","customerFactory","$modalInstance","item",
        function($scope,$location,toaster, customerFactory,$modalInstance, item){

        $scope.judul = "Edit Customer";
        $scope.item = {
            idcustomer : item.idcustomer,
            nama : item.nama,
            alamat : item.alamat
        };

        $scope.cancel = function(){
            $modalInstance.dismiss("cancel");
        };
        $scope.simpan = function(){
            customerFactory.editCustomer(JSON.stringify($scope.item)).
                then(function(){
                    if(customerFactory.respon==1){
                        toaster.pop("success", "Edit Customer", 'Data telah terupdate');
                        $modalInstance.close("ok");
                    }else{
                        toaster.pop("error", "Edit Customer", 'Simpan Error');
                    }

                },function(){});

        };
    }]);
}());
