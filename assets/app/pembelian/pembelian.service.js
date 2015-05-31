(function () {
    var app = angular.module("app");
    var pembelianFactory = function ($http, $q) {

        var listPembelian = [];
        var objPembelian = {};
		var listJenisBarang = [];

        var getData = function (actionMethode, methodeParams) {
            var deferred = $q.defer();
            var url = "repository/pembelian/pembelian.php";
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

        return {
            listPembelian: listPembelian,
            objPembelian: objPembelian,
            getData: getData,
			listJenisBarang : listJenisBarang

        }
    };
    app.factory("pembelianFactory", ["$http", "$q", pembelianFactory]);
}());

