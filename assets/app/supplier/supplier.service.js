(function () {
    var app = angular.module("app");
    var supplierFactory = function ($http, $q) {

        var listSupplier = [];
        var respon = [];
        var objSupplier = {};

        var request = function (actionMethode, methodeParams) {
            var deferred = $q.defer();
            var url = "repository/supplier/supplier.php";
            var dataload = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: dataload
            })
                .then(function (result) {
                    if (actionMethode == "getAll" || actionMethode == "getById") {
                        angular.copy(result.data, listSupplier);
                    } else {
                        angular.copy(result.data, respon);
                    }

                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });


            return deferred.promise;
        };

        var getSupplier = function () {
            return request("getAll", undefined);
        };
        var getSupplierById = function (params) {
            return request("getById", params);
        };
        var addSupplier = function (params) {
            return request("add", params);
        };
        var deleteSupplier = function (params) {
            return request("delete", params);
        };
        var editSupplier = function (params) {
            return request("update", params);
        };

        return {
            listSupplier: listSupplier,
            objSupplier: objSupplier,
            respon: respon,
            getSupplier: getSupplier,
            getSupplierById : getSupplierById,
            addSupplier : addSupplier,
            deleteSupplier : deleteSupplier,
            editSupplier : editSupplier

        }
    };
    app.factory("supplierFactory", ["$http", "$q", supplierFactory]);
}());

