(function(){
    var app = angular.module("app");
    app.factory("customerFactory",["$http","$q",function($http, $q){
        var listCustomer = [];
        var respon = [];
        var objCustomer = {};
        var request = function(actionMethode, methodeParams){
            var deferred = $q.defer();
            var url = "repository/customer/customer.php";
            var reqData = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: reqData
            })
                .then(function (result){
                if(actionMethode == "getAll" || actionMethode == "getById"){
                    angular.copy(result.data, listCustomer);
                }else{
                    angular.copy(result.data, respon);
                }
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        };

        var getCustomer = function(){
          return request("getAll");
        };
        var getCustomerById = function(params){
          return request("getById", params);
        };
        var addCustomer = function(params){
            return request("add", params);
        };
        var deleteCustomer = function(params){
            return request("delete", params);
        };
        var editCustomer = function(params){
            return request("update", params);
        };

        return {
            listCustomer : listCustomer,
            objCustomer : objCustomer,
            respon : respon,
            getCustomer : getCustomer,
            getCustomerById : getCustomerById,
            addCustomer : addCustomer,
            deleteCustomer :deleteCustomer,
            editCustomer : editCustomer
        }

    }]);
}());