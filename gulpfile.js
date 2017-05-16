'use strict';

const path = require('path');

const gulp = require('gulp');
const pug = require('pug');
const through = require('through2');

const pattern = /templateUrl:\s*'([\w.\\\/]+\.pug)'/g;

const buildTemplate = through.obj(function transform(file, encoding, callback) {
    let contents = file.contents.toString(encoding);
    if (contents.match(pattern)) {

        file.contents = new Buffer(contents.replace(pattern, (match, cap) => {
            let dirpath = path.relative(path.resolve(file.cwd, 'dist'), path.dirname(file.path));
            let pugPath = path.resolve(dirpath, cap);
            return `template: '${pug.renderFile(pugPath).replace(/'/g, "\\'")}'`;
        }), encoding);

        return callback(null, file);
    }

    callback(null);
});

gulp.task('build-templates', () => {
    return gulp.src(['./dist/**/*.js', '!*.umd.js'])
        .pipe(buildTemplate)
        .pipe(gulp.dest('./dist'));
});