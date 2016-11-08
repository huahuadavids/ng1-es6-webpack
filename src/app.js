import angular from "angular";
import "styles/index.scss";
import "styles/main.scss";
import "angular-ui-router";
import "modules/view1.js";
import "modules/view2.js";


let app = angular.module("app", ['ui.router', 'view1', 'view2']);
app.controller("mainController", ["$scope", ($scope) => {
  $scope.name = "hello worlds!";
}]);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/view1');
}]);
