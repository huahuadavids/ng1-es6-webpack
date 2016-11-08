import "styles/view1.scss";
import {view1} from "routes/index";
let view1App = angular.module('view1', ['ui.router'])
  .config(['$stateProvider', ($stateProvider) => {
    $stateProvider.state(view1);
  }])
  .controller('view1Controller', ["$scope", ($scope) => {
    $scope.name = "view1";
  }]);
export default view1App;

