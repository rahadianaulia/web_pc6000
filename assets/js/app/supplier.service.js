(function(){
    var app = angular.module("app");
    var supplierFactory = function($http, $q) {

		var listSupplier = [];
		
        var getData = function(actionMethode, methodeParams){
            var deferred = $q.defer();
            var url = "repository/supplier/supplier.php";
            var dataload = $.param({action:actionMethode, params : methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: dataload
            })
                .then(function(result){
                    angular.copy(result.data, listSupplier);
                    deferred.resolve();
                },function(){
                    deferred.reject();
                });
				
				
            return deferred.promise;
        };
		
        return {
            listSupplier : listSupplier,
            getData : getData
        }
    };
    app.factory("supplierFactory", ["$http", "$q",supplierFactory]);
}());

