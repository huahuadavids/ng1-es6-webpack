var gulp = require("gulp");
var webpack = require("gulp-webpack");
var eslint = require("gulp-eslint");
var sequence = require("gulp-sequence");
var config = require("./webpack.config");
var clean = require("gulp-clean");

gulp.task("webpack", function () {
  return gulp.src('./src/app.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./dist/'));
})

gulp.task("clean",function(){
  return gulp.src('./dist', {read: false})
    .pipe(clean());
})
gulp.task("eslint",function(){
  return gulp.src("./src/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})

gulp.task("watch",function(){
  return gulp.watch("./src/**/*.js",["eslint"])
})

gulp.task("default",sequence(["clean",'webpack']));

