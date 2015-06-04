(function(){
    var app = angular.module("app");
    app.controller("addCustomerCtrl",["$scope","$location","toaster","customerFactory", function($scope,$location, toaster,customerFactory){
        $scope.status = 0;
        $scope.customer = {};
        var emptyForm = function(){
              $scope.customer= {};
        };
        $scope.cancel = function(){
            $location.path("/customer");
        };
        $scope.save = function(){
            customerFactory.addCustomer(JSON.stringify($scope.customer)).
                then(function(){
                    $scope.status = customerFactory.listCustomer;
                    toaster.pop("success", "Tambah Customer", '"' + $scope.customer.nama + '" berhasil disimpan');
                    emptyForm();

                },function(){});
        };
    }]);
}());