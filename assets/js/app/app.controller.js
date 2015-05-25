/**
 * Created by skylab on 21/05/2015.
 */
(function(){
    var app = angular.module("app");
    var appCtrl = function($scope, $location, $http){
		$scope.isActive=function(viewLocation){
			return viewLocation ===$location.path();
		};
		
		$scope.showAlert="";
		
		$scope.simpanSupplier=function(supplier){
			$scope.url="repository/supplier/simpansupplier.php";
			$scope.nama=supplier.nama;
			$scope.alamat=supplier.alamat;
			$scope.telp=supplier.telp;
									
			$http.post('repository/supplier/simpansupplier.php', {'nama': $scope.nama, 'alamat': $scope.alamat, 'telp': $scope.telp}).
			success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available
			console.log(config);
			$scope.showAlert="pageInclude/alertSuccess.html";
			clearFieldSupplier();
			}).
			error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log(config);
			});
		};
		
		var clearFieldSupplier=function(){
			
		};
    };
    app.controller("appCtrl",["$scope","$location","$http",appCtrl]);
}());