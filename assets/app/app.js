/**
 * Created by skylab on 21/05/2015.
 */
(function(){
    var app = angular.module("app",["ngRoute","ui.bootstrap", "myDirective"]);
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
                controller : "addSupplierCtrl"
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
            when("/customer/add",{
                templateUrl:"view/customer/addCustomer.html",
                controller : "addCustomerCtrl"
            }).
			when("/barang",{
				templateUrl : "view/barang/barang.html",
				controller : "barangCtrl"
			}).
			when("/barang/add",{
				templateUrl : "view/barang/inputBarang.html",
				controller : "barangCtrl"
			}).
			when("/barang/edit",{
				templateUrl : "view/barang/editbarang.html",
				controller : "editBarangCtrl"
			}).
			when("/pembelian/add",{
				templateUrl : "view/pembelian/inputPembelian.html",
				controller : "pembelianCtrl"
			}).
            otherwise({
                redirectTo : "/home"
            })
    };
    app.config(["$routeProvider",appRoute]);

}());