import "./view2.scss";
let app = angular.module('view2', ['ngRoute']);
app.config(['$routeProvider', ($routeProvider) => {
  $routeProvider.when('/view2', {
    template: require("./view2.html"),
    controller: 'view2Controller'
  });
}])
  .controller('view2Controller', ["$scope",($scope) => {
    $scope.name = "view2";
  }]);
export default app;

