(function(){
    var app = angular.module("app");
    app.controller("editCustomerCtrl",["$scope","$location","customerFactory",function($scope,$location, customerFactory){

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
                        console.log(customerFactory.respon);
                        alert("Update Berhasil");
                        $location.path("/customer");
                    }

                },function(){});

        };
    }]);
}());
