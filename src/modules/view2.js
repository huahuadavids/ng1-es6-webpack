import "styles/view2.scss";
let app = angular.module('view2', ['ui.router']);
import { view2 } from "routes/index";
app.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(view2);
}])
  .controller('view2Controller', ["$scope", ($scope) => {
    $scope.name = "view2";
  }]);
export default app;

