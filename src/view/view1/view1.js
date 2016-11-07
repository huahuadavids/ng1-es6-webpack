import "./view1.scss";
let angular = require("angular");
let view1App = angular.module('view1', ['ui.router'])
  .config(['$stateProvider', ($stateProvider) => {
    $stateProvider.state('view1', {
      url:"./view1",
      template: require("./view1.html"),
      controller: 'view1Controller'
    });
  }])
  .controller('view1Controller', ["$scope", ($scope) => {
    $scope.name = "view1";
  }]);
export default view1App;

