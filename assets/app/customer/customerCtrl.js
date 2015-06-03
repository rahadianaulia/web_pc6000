(function () {
    var app = angular.module("app");
    app.controller("customerCtrl", ["$scope","$modal", "customerFactory", function ($scope,$modal, customerFactory) {
        $scope.respon = customerFactory;
        var init = function () {
            customerFactory.getCustomer().then(function () {
            }, function () {
            });
        };
        init();

        $scope.edit = function (item) {
            customerFactory.objCustomer = item;
        };
        $scope.delete = function(itemToDelete){
            var modalDialog = $modal.open({
                templateUrl : "view/modal/confirmDialog.html",
                controller : "confirmDialogCtrl",
                size : "sm",
                backdrop : false,
                resolve :{
                    header : function(){
                        return "Konfirmasi";
                    },
                    pesan : function(){
                        return "Hapus customer " + itemToDelete.nama + " ?";
                    }
                }
            });

            modalDialog.result.then(function(hasil){
                customerFactory.deleteCustomer(JSON.stringify(itemToDelete)).
                    then(function(){
                        alert("Data terhapus");
                        init();
                    },function(){});
            },function(){});
        };


    }]);
}());
