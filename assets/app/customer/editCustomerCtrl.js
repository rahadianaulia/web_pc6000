(function(){
    var app = angular.module("app");
    app.controller("editCustomerCtrl",["$scope","$location","toaster","customerFactory",function($scope,$location,toaster, customerFactory){

        if(customerFactory.objCustomer.idcustomer == undefined){
            $location.path("/customer");
        }
        $scope.item = customerFactory.objCustomer;
        $scope.cancel = function(){
            $location.path("/customer");
        };
        $scope.simpan = function(){
            customerFactory.editCustomer(JSON.stringify($scope.item)).
                then(function(){
                    if(customerFactory.respon==1){
                        toaster.pop("success", "Info", 'Data telah terupdate');
                        $location.path("/customer");
                    }

                },function(){});

        };
    }]);
}());
