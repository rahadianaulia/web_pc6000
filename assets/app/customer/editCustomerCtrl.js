(function(){
    var app = angular.module("app");
    app.controller("editCustomerCtrl",["$scope","$location","customerFactory",function($scope,$location, customerFactory){
        $scope.item = customerFactory.objCustomer;
        //console.log(JSON.stringify($scope.item));
        $scope.cancel = function(){
            $location.path("/customer");
        };
        $scope.simpan = function(){
            customerFactory.getData("update", JSON.stringify($scope.item)).
                then(function(){
                    if(customerFactory.listCustomer==1){
                        alert("Update Berhasil");
                        $location.path("/customer");
                    }

                },function(){});

        };
    }]);
}());
