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
                templateUrl : "view/supplier/supplier.html",
                controller : "supplierCtrl"
            }).
            when("/supplier/add",{
                templateUrl:"view/supplier/inputSupplier.html",
                controller : "supplierCtrl"
            }).
            when("/supplier/edit",{
                templateUrl:"view/supplier/editSupplier.html",
                controller : "editSupplierCtrl"
            }).
            when("/customer",{
                templateUrl:"view/customer/customer.html",
                controller : "customerCtrl"
            }).
            when("/customer/edit",{
                templateUrl:"view/customer/editCustomer.html",
                controller : "editCustomerCtrl"
            }).
            otherwise({
                redirectTo : "/home"
            })
    };
    app.config(["$routeProvider",appRoute]);

}());