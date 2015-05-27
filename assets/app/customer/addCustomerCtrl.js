(function(){
    var app = angular.module("app");
    app.controller("addCustomerCtrl",["$scope","$location","customerFactory", function($scope,$location, customerFactory){
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