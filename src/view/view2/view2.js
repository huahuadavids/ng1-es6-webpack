import "./view2.scss";
let app = angular.module('view2', ['ui.router']);
app.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state('view2', {
    url:"./view2",
    template: require("./view2.html"),
    controller: 'view2Controller'
  });
}])
  .controller('view2Controller', ["$scope", ($scope) => {
    $scope.name = "view2";
  }]);
export default app;

