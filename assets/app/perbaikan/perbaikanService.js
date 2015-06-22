(function(){
    var app = angular.module("app");
    app.service("perbaikanFactory",["$http","$q", function($http, $q){
        var listPerbaikan = [];
        var respon = [];
        var objPerbaikan = {};
        var request = function(actionMethode, methodeParams){
            var deferred = $q.defer();
            var url = "repository/perbaikan/perbaikan.php";
            var reqData = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: reqData
            })
                .then(function (result){
                    if(actionMethode.startsWith("get")){
                        angular.copy(result.data, listPerbaikan);
                    }else{
                        angular.copy(result.data, respon);
                    }
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        };

        var getPerbaikan = function(){
            return request("getAll", undefined);
        };
        var getByTglMasuk = function(tglMasuk){
            return request("getByTglMasuk", tglMasuk)
        };
        var getByTglKeluar = function(tglKeluar){
            return request("getByTglKeluar", tglKeluar)
        };
        var getByStatusTglMasuk = function(params){
            return request("getByStatusTglMasuk", params)
        };
        var addPerbaikan = function(params){
            return request("add", params);
        };
        var deletePerbaikan = function(params){
            return request("delete", params);
        };
        var editPerbaikan = function(params){
            return request("edit", params);
        };
        var updatePerbaikan = function(params){
            return request("update", params);
        };
        return{
            listPerbaikan : listPerbaikan,
            respon : respon,
            objPerbaikan : objPerbaikan,
            getPerbaikan : getPerbaikan,
            getByTglMasuk : getByTglMasuk,
            getByTglKeluar : getByTglKeluar,
            getByStatusTglBasuk : getByStatusTglMasuk,
            addPerbaikan : addPerbaikan,
            deletePerbaikan : deletePerbaikan,
            editPerbaikan : editPerbaikan,
            updatePerbaikan : updatePerbaikan
        }
    }]);
}());