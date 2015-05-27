(function(){
    var app = angular.module("app");
    app.controller("addCustomerCtrl",["$scope","customerFactory", function($scope, customerFactory){
        $scope.status = 0;
        $scope.customer = {};
        var emptyForm = function(){
              $scope.customer= {};
        };
        $scope.cancel = function(){
            $location.path("/customer");
        };
        $scope.save = function(){
            customerFactory.getData("add", JSON.stringify($scope.customer)).
                then(function(){
                    $scope.status = customerFactory.listCustomer;
                    emptyForm();
                },function(){});
        };
    }]);
}());