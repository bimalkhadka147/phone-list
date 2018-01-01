"use strict";

var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require('gulp-clean-css');
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("babel", function () {
  return gulp.src("js/main.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("js"));
});



gulp.task("sass", function () {

	return gulp.src("./scss/**/*.scss")
	           .pipe(sass().on("error", sass.logError))
	           .pipe(autoprefixer({
	           	    browsers: ['last 5 versions'],
	           	    cascade: false
	           	}))
	           .pipe(gulp.dest("./css"));
});

gulp.task('minify-css', function() {
  return gulp.src('./css/style.css')
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
  .pipe(gulp.dest('./css'));
});


gulp.task("watch", function(){
	 gulp.watch("./scss/**/*.scss", ["sass"]);
	 gulp.watch("./js/main.js", ["babel"]);
});


gulp.task("default", ["sass","babel", "watch"]);



