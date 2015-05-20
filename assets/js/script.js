var myApp=angular.module('myApp', []);

myApp.controller("navMenuCtrl", function($scope){
  $scope.template='home.html';
  
  $scope.switch=function(namafile){
    $scope.template=namafile;
  };
});