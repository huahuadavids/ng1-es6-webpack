import angular from "angular";
import "angular-route";
import "./view/view1/view1.js";
import "./view/view2/view2.js";
import "./reset.scss";
let app = angular.module("app", ['ngRoute', 'view1', 'view2']);
app.controller("mainController", ($scope) => {
  $scope.name = "hello worlds!";
});
app.config(['$locationProvider', '$routeProvider',
  ($locationProvider, $routeProvider) => {
  // $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);