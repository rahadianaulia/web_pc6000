(function(){
    var app = angular.module("app");
    app.controller("customerCtrl",["$scope","customerFactory",function($scope,customerFactory){
            $scope.respon = customerFactory;
            var init = function(){
                customerFactory.getData("getAll", undefined).then(function (){},function(){});
            };
            init();

            $scope.edit = function(item){
                customerFactory.objCustomer = item;
            };
            console.log($scope.respon);
    }]);
}());
