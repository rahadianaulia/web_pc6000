(function () {
    var app = angular.module("app");
    var barangFactory = function ($http, $q) {

        var listBarang = [];
        var objBarang = {};
		var listJenisBarang = [];

        var getData = function (actionMethode, methodeParams) {
            var deferred = $q.defer();
            var url = "repository/barang/barang.php";
            var dataload = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: dataload
            })
                .then(function (result) {
                    angular.copy(result.data, listBarang);
					angular.copy(result.data, listJenisBarang);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });


            return deferred.promise;
        };

        return {
            listBarang: listBarang,
            objBarang: objBarang,
            getData: getData,
			listJenisBarang : listJenisBarang

        }
    };
    app.factory("barangFactory", ["$http", "$q", barangFactory]);
}());

