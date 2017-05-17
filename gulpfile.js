'use strict';

const path = require('path');

const gulp = require('gulp');
const pug = require('pug');
const through = require('through2');

const REPLACE_CONFIG = {
    js: {
        templatePattern: /templateUrl:\s*'([\w.\\\/]+\.pug)'/g,
        quotePattern: /'/g,
        quoteReplaceChar: `\\'`,
        propertyQuoteChar: ``,
        valueQuoteChar: `'`,
    },
    json: {
        templatePattern: /"templateUrl":\s*"([\w.\\\/]+\.pug)"/g,
        quotePattern: /"/g,
        quoteReplaceChar: `\\"`,
        propertyQuoteChar: `"`,
        valueQuoteChar: `"`,
    }
};

const buildTemplate = through.obj(function transform(file, encoding, callback) {
    let contents = file.contents.toString(encoding);
    let config = REPLACE_CONFIG[path.extname(file.path).substring(1)];
    if (contents.match(config.templatePattern)) {
        file.contents = new Buffer(contents.replace(config.templatePattern, (match, cap) => {
            let dirpath = path.relative(path.resolve(file.cwd, 'dist'), path.dirname(file.path));
            let pugPath = path.resolve(dirpath, cap);
            return `${config.propertyQuoteChar}template${config.propertyQuoteChar}: ${config.valueQuoteChar}${pug.renderFile(pugPath).replace(config.quotePattern, config.quoteReplaceChar)}${config.valueQuoteChar}`;
        }), encoding);

        return callback(null, file);
    }

    callback(null);
});

gulp.task('build-templates', () => {
    return gulp.src(['./dist/**/*.js', './dist/**/*.metadata.json', '!*.umd.js'])
        .pipe(buildTemplate)
        .pipe(gulp.dest('./dist'));
});