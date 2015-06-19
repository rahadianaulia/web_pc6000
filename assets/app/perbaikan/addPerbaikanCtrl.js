(function(){
    var app = angular.module("app");
    app.controller("addPerbaikanCtrl",["$scope","$modal", "customerFactory", function($scope,$modal,customerFactory){
        $scope.customers = customerFactory;
        var init = function () {
            customerFactory.getCustomer().then(
                function () {
                    console.log($scope.customers);
                }, function () {
                });
        };
        init();

        $scope.tambahCustomer = function(){
            var addCustomer = $modal.open({
                templateUrl : "view/customer/addCustomerPartial.html",
                controller : "addCustomerModalCtrl",
                backdrop : false
            });

            addCustomer.result.then(function(hasil){
                init();
            },function(){});

        };
    }]);
}());
