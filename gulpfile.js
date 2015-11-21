"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var jade = require("gulp-jade");
var sass = require("gulp-sass");
var pkg = require("./package.json");
var tslint = require("gulp-tslint");

gulp.task("scripts", function () {
    return gulp.src([
        "bower_components/bluebird/js/browser/bluebird.min.js"
    ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("./app/js/"));
});

gulp.task("templates", function () {
    gulp.src("./source/jade/**/*.jade")
        .pipe(jade({
            data: {
                debug: false,
                timestamp: new Date().toISOString(),
                version: pkg.version
            },
            pretty: true
        }))
        .pipe(gulp.dest("./app/"))
});

gulp.task("sass", function () {
    gulp.src("./source/sass/style.scss")
        .pipe(sass({ outputStyle: "compact", outFile: "style.css" })
            .on("error", sass.logError))
        .pipe(gulp.dest("./app/css/"));
});

gulp.task("tslint", function () {
    return gulp.src(["./source/**/*.ts", "./test/**/*.ts"])
        .pipe(tslint())
        .pipe(tslint.report("verbose", {
            emitError: false
        }));
});

gulp.task("sass:watch", function () {
    gulp.watch("./source/**/*.scss", ["sass"]);
});

gulp.task("jade:watch", function () {
    gulp.watch("./source/**/*.jade", ["templates"]);
});

gulp.task("ts:watch", function () {
    gulp.watch(["./source/**/*.ts", "./test/**/*.ts"], ["tslint"]);
});

gulp.task("default", ["scripts", "templates", "sass"]);
gulp.task("watch", ["sass:watch", "jade:watch", "ts:watch"]);
