import angular from "angular";
import "./reset/index.scss";
import "./main.scss";
import "angular-route";
import "./view/view1/view1.js";
import "./view/view2/view2.js";
let app = angular.module("app", ['ngRoute', 'view1', 'view2']);
app.controller("mainController", ["$scope", ($scope) => {
  $scope.name = "hello worlds!";
}]);
app.config(['$locationProvider', '$routeProvider',
  ($locationProvider, $routeProvider) => {
  // $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);