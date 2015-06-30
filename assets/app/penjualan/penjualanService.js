(function(){
    var app = angular.module("app");
    app.factory("penjualanFactory",["$http","$q",function($http, $q){
        var listCustomer = [];
        var listBarang = [];
        var messages = [];

        var request = function(actionMethode, methodeParams){
            var deferred = $q.defer();
            var url = "repository/penjualan/penjualan.php";
            var reqData = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: reqData
            })
                .then(function (result){
                    if (actionMethode == "getCustomers"){
                        angular.copy(result.data, listCustomer);
                    } else if (actionMethode == "getDataBarang"){
                        angular.copy(result.data, listBarang);
                    }
                    angular.copy(result.data, messages);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        };

        var getCustomers = function(){
          return request("getCustomers");
        };
        var getDataBarang = function(){
            return request("getDataBarang");
        };
        var simpanPenjualan = function(params){
            return request("simpanPenjualan", params);
        };

        return {
            getCustomers : getCustomers,
            getDataBarang : getDataBarang,
            simpanPenjualan : simpanPenjualan,
            listCustomer : listCustomer,
            listBarang : listBarang,
            messages : messages
        }

    }]);
}());