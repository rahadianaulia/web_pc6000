(function () {
    var app = angular.module("app");
    var pembelianFactory = function ($http, $q) {

        var listPembelian = [];
        var objPembelian = {};
		var listJenisBarang = [];
        var listSupplier = [];
        var listBarang = [];
        var detailBeli = [];

        var url = "repository/pembelian/pembelian.php";

        var getData = function (actionMethode, methodeParams) {
            var deferred = $q.defer();
            var dataload = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: dataload
            })
                .then(function (result) {
                    angular.copy(result.data, listPembelian);
					angular.copy(result.data, listJenisBarang);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });


            return deferred.promise;
        };

        var getDataSupplier = function (actionMethode){
            var deferred = $q.defer();
            var dataload = $.param({action: actionMethode});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: dataload
            }).then(function (result) {
                    angular.copy(result.data, listSupplier);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });

            return deferred.promise;
        };

        var getDataBarang = function(actionMethode){
            var deferred = $q.defer();
            var dataload = $.param({action: actionMethode});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: dataload
            }).then(function (result) {
                    angular.copy(result.data, listBarang);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });

            return deferred.promise;
        }

        var getDetailBeli = function(actionMethode, methodeParams){
            var deferred = $q.defer();
            var dataload = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: dataload
            }).then(function (result) {
                    angular.copy(result.data, detailBeli);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });

            return deferred.promise;
        }

        return {
            listPembelian: listPembelian,
            objPembelian: objPembelian,
            getData: getData,
            getDataSupplier : getDataSupplier,
            getDataBarang : getDataBarang,
            getDetailBeli : getDetailBeli,
			listJenisBarang : listJenisBarang,
            listSupplier : listSupplier,
            listBarang : listBarang,
            detailBeli : detailBeli
        }
    };
    app.factory("pembelianFactory", ["$http", "$q", pembelianFactory]);
}());

