
let angular = require("angular");
let filterModule = angular.module("filterModule", []);
filterModule.filter("sub", () => {
  return (input) => {
    return input.substr(1);
  };
});
export default filterModule;