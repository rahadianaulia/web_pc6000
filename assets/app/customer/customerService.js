(function(){
    var app = angular.module("app");
    app.factory("customerFactory",["$http","$q",function($http, $q){
        var listCustomer = [];
        var objCustomer = {};
        var getData = function(actionMethode, methodeParams){
            var deferred = $q.defer();
            var url = "repository/customer/customer.php";
            var reqData = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: reqData
            })
                .then(function (result) {
                    angular.copy(result.data, listCustomer);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        };

        return {
            listCustomer : listCustomer,
            objCustomer : objCustomer,
            getData : getData
        }

    }]);
}());