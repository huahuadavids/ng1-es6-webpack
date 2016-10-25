var gulp      = require("gulp");
var uglify    = require("gulp-uglify");
var webpack   = require("gulp-webpack");
var eslint    = require("gulp-eslint");
var sequence  = require("gulp-sequence");
var config    = require("./webpack.config");
var clean     = require("gulp-clean");
var cleanCss  = require("gulp-clean-css");
var htmlmin   = require('gulp-htmlmin');

gulp.task("webpack", function () {
  return gulp.src("./src/app.js")
    .pipe(webpack(config))
    .pipe(gulp.dest("./dist/"));
})

gulp.task("clean",function(){
  return gulp.src("./dist", {read: false})
    .pipe(clean());
})

gulp.task("eslint",function(){
  return gulp.src("./src/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})

gulp.task("uglify",function(){
  return gulp.src("./dist/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist"))
})

gulp.task("minifyCss",function(){
  return gulp.src("./dist/*.css")
    .pipe(cleanCss())
    .pipe(gulp.dest("./dist"))
})

gulp.task("htmlmin",function(){
  return gulp.src("./dist/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("./dist"))
})

gulp.task("watch",function(){
  return gulp.watch("./src/**/*.js",["eslint"])
})

gulp.task("default",sequence(["clean","webpack"]));

