(function () {
    var app = angular.module("app");
    app.controller("customerCtrl", ["$scope","$modal","toaster" , "customerFactory", function ($scope,$modal,toaster, customerFactory) {
        $scope.respon = customerFactory;
        var init = function () {
            customerFactory.getCustomer().then(function () {
            }, function () {
            });
        };
        init();

        $scope.editCustomer = function(itemToEdit){
            var editDialog = $modal.open({
                templateUrl : "view/customer/editCustomerModal.html",
                controller : "editCustomerCtrl",
                backdrop : false,
                resolve : {
                    item : function(){
                        return itemToEdit;
                    }
                }
            });

            editDialog.result.then(function(hasil){
                init();
            },function(){});

        };
        $scope.delete = function(itemToDelete){
            var modalDialog = $modal.open({
                templateUrl : "view/modal/confirmDialog.html",
                controller : "confirmDialogCtrl",
                //size : "sm",
                backdrop : false,
                resolve :{
                    header : function(){
                        return "Konfirmasi";
                    },
                    pesan : function(){
                        return 'Hapus customer "' + itemToDelete.nama + '" ?';
                    }
                }
            });

            modalDialog.result.then(function(hasil){
                customerFactory.deleteCustomer(JSON.stringify(itemToDelete)).
                    then(function(){
                        toaster.pop("success", "Hapus Customer", '"' + itemToDelete.nama  + '" telah terhapus');
                        init();
                    },function(){});
            },function(){});
        };

        $scope.isCollapse = false;
        $scope.collapsePanel = function(){
            $scope.isCollapse = !$scope.isCollapse;
        }

    }]);
}());
