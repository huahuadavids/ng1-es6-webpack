import angular from "angular";
import "./reset/index.scss";
import "./main.scss";
import "angular-ui-router";
import "./view/view1/view1.js";
import "./view/view2/view2.js";


let app = angular.module("app", ['ui.router', 'view1', 'view2']);
app.controller("mainController", ["$scope", ($scope) => {
  $scope.name = "hello worlds!";
}]);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/view1');
}]);
