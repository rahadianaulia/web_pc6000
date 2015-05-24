/**
 * Created by skylab on 21/05/2015.
 */
(function(){
    var app = angular.module("app");
    var appCtrl = function($scope, $location, $http){
		$scope.isActive=function(viewLocation){
			return viewLocation ===$location.path();
		};
		
		$scope.simpanSupplier=function(supplier){
			$scope.url="repository/supplier/simpansupplier.php";
			$scope.nama=supplier.nama;
			$scope.alamat=supplier.alamat;
			$scope.telp=supplier.telp;
			
			/* var data={"nama":$scope.nama, "alamat":$scope.alamat, "telp":$scope.telp};
			$http.post($scope.url, data).
			success(
				function (data, status){
					$scope.status=status;
					$scope.data=data;
					console.log(data);
				}
			).
			error(
				function (data, status){
					$scope.status=status || "request failed";
					$scope.data=data;
				}
			); */
			/* var data={'nama': $scope.nama, 'pswd': $scope.alamat, 'email': $scope.telp};
			$http.post('repository/supplier/simpansupplier.php', data
			).success(function(data, status, headers, config) {
				console.log(data);
			}).error(function(data, status) { // called asynchronously if an error occurs
			// or server returns response with an error status.
				console.log(status);
			}); */
			
			$http({
			url: 'repository/supplier/simpansupplier.php',
			method: "POST",
			data: {'nama': $scope.nama, 'pswd': $scope.alamat, 'email': $scope.telp},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (data, status, headers, config) {
			console.log(data);

			}).error(function (data, status, headers, config) {});
		};
    };
    app.controller("appCtrl",["$scope","$location","$http",appCtrl]);
}());