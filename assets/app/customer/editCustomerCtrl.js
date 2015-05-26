(function(){
    var app = angular.module("app");
    app.controller("editCustomerCtrl",["$scope","customerFactory",function($scope, customerFactory){
        $scope.item = customerFactory.objCustomer;
        console.log(JSON.stringify($scope.item));

        $scope.simpan = function(){
            customerFactory.getData("update", JSON.stringify($scope.item)).
                then(function(){
                    alert("data telah disimpan");
                },function(){});

        };
    }]);
}());
