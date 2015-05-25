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
            when("/supplier",{
                templateUrl : "supplier.html",
                controller : "supplierCtrl"
            }).
            when("/supplier/add",{
                templateUrl:"inputsupplier.html",
                controller : "supplierCtrl"
            }).
            when("/supplier/edit",{
                templateUrl:"editsupplier.html",
                controller : "editSupplierCtrl"
            }).
            otherwise({
                redirectTo : "/home"
            })
    };
    app.config(["$routeProvider",appRoute]);

}());