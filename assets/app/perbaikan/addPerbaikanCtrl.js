(function(){
    var app = angular.module("app");
    app.controller("addPerbaikanCtrl",["$scope","$modal","perbaikanFactory", "customerFactory",
        function($scope,$modal,perbaikanFactory,customerFactory){
        $scope.customers = customerFactory;
        var init = function () {
            customerFactory.getCustomer().then(
                function () {
                }, function () {
                });
        };
        init();
        $scope.perbaikan={
            status : "Belum Selesai",
            keterangankembali : null,
            total : null,
            tglselesai : null
        };

        $scope.simpan = function(){
            perbaikanFactory.addPerbaikan(JSON.stringify($scope.perbaikan)).then(
                function(){
                }, function(){}
            );
        };

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
