(function(){
    var app = angular.module("app");
    app.controller("customerCtrl",["$scope","customerFactory",function($scope,customerFactory){
            $scope.respon = customerFactory;
            var init = function(){
                customerFactory.getData("getAll", undefined).then(function (){},function(){});
            };
            init();
            console.log($scope.respon);
    }]);
}());
