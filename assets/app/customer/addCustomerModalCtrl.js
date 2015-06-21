(function(){
    var app = angular.module("app");
    app.controller("addCustomerModalCtrl",["$scope","$location","toaster","$modalInstance","customerFactory", function($scope,$location, toaster,$modalInstance,customerFactory){
        $scope.status = 0;
        $scope.customer = {};
        var emptyForm = function(){
            $scope.customer= {};
        };
        $scope.cancel = function(){
            $modalInstance.dismiss("cancel");
        };
        $scope.save = function(){
            customerFactory.addCustomer(JSON.stringify($scope.customer)).
                then(function(){
                    $scope.status = customerFactory.listCustomer;
                    toaster.pop("success", "Tambah Customer", '"' + $scope.customer.nama + '" berhasil disimpan');
                    emptyForm();
                    $modalInstance.close("ok");

                },function(){});
        };
    }]);
}());