import "./view1.scss";
let view1App = angular.module('view1', ['ngRoute'])
  .config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/view1', {
      template: require("./view1.html"),
      controller: 'view1Controller'
    });
  }])
  .controller('view1Controller', ["$scope", ($scope) => {
    $scope.name = "view1";
  }]);
export default view1App;

