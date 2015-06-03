(function(){
    var app = angular.module("app");
		
    var supplierCtrl = function($scope,$routeParams,$modal,$location, supplierFactory){
        $scope.respons = supplierFactory;

		//initial variable for pagination
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 5;
		$scope.numPerPage = 5;

		//get data supplier
        var getSupplier = function () {
            supplierFactory.getSupplier().
                then(function () {
					$scope.totalItems=$scope.respons.listSupplier.length;
                }, function () {
                    console.log("Error");
                });
        };

		//get location
        if($location.path() === "/supplier"){
            getSupplier();
        }
		
		//edit supplier
        $scope.edit= function(item){
            supplierFactory.objSupplier = item;
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
                        return 'Hapus supplier "' + itemToDelete.nama + '" ?';
                    }
                }
            });

            modalDialog.result.then(function(hasil){
                supplierFactory.deleteSupplier(JSON.stringify(itemToDelete)).
                    then(function(){
                        alert("Data terhapus");
                        getSupplier();
                    },function(){});
            },function(){});
        };

    };
    app.controller("supplierCtrl",["$scope", "$routeParams","$modal","$location","supplierFactory", supplierCtrl]);

}());