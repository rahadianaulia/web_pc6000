(function(){
    var app = angular.module("app");
    app.service("detailPerbaikanFactory",[function(){
        var arrDetail = [];
        var respon = [];

        var request = function(actionMethode, methodeParams){
            var deferred = $q.defer();
            var url = "repository/perbaikan/detailPerbaikan.php";
            var reqData = $.param({action: actionMethode, params: methodeParams});
            $http({
                url: url,
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: reqData
            })
                .then(function (result){
                    if(actionMethode.startsWith("get")){
                        angular.copy(result.data, arrDetail);
                    }else{
                        angular.copy(result.data, respon);
                    }
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        };

        var getDetailById = function(idPerbaikan){
            return reqData("getByIdPerbaikan", idPerbaikan)
        };
        var addDetail = function(detail){
            return reqData("add", detail);
        };
        var delDetail = function(detail){
          return reqData("delete", detail);
        };
        return {
            arrDetail : arrDetail,
            respon :respon,
            getDetailById : getDetailById,
            addDetail : addDetail,
            delDetail : delDetail
        }
    }]);
}());