/**
 * Created by mac on 16/10/31.
 */
require.ensure(["./app.js","./test.js"],function(require){
  "use strict";
  require("./app.js");
  var test = require("./test.js");
  console.log(test)
})