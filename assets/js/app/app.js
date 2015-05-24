/**
 * Created by skylab on 21/05/2015.
 */
(function(){
    var app = angular.module("app",["ngRoute"]);
    var appRoute = function($routeProvider){
        $routeProvider.
            when("/home",{
                templateUrl : "home.html"
            }).
            when("/test",{
                templateUrl : "test.html"
            }).
			when("/supplier/add",{
				templateUrl:"inputsupplier.html"
			}).
            when("/supplier",{
                templateUrl : "supplier.html",
                controller : "supplierCtrl"
            }).
            otherwise({
                redirectTo : "/home"
            })
    };
    app.config(["$routeProvider",appRoute]);

}());