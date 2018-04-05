'use strict';

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const _ = require('lodash');
const pug = require('pug');
const sass = require('node-sass');
const through = require('through2');

const RELATIVE_IMPORT_PATTERN = /@import '~/g;

function renderPug(path) {
    return pug.renderFile(path);
}

function renderSass(path) {
    let content = fs.readFileSync(path, 'utf8').replace(RELATIVE_IMPORT_PATTERN, `@import 'node_modules/`);
    let result = sass.renderSync({
        data: content,
        includePaths: ['node_modules'],
        outputStyle: 'compressed'
    });
    return result.css.toString().trim();
}

const REPLACE_CONFIG = {
    js: {
        replacements: [{
            pattern: /templateUrl:\s*'([\w.\\\/]+\.pug)'/g,
            replacementWord: 'template',
            renderer: renderPug
        }, {
            pattern: /styleUrls:\s*\[\s*((?:'[\w.\\\/]+\.scss',?\s*)+\s*)]/g,
            filePattern: /[\w.\\\/]+/g,
            replacementWord: 'styles',
            renderer: renderSass
        }],
        quotePattern: /'/g,
        quoteReplaceChar: `\\'`,
        propertyQuoteChar: ``,
        valueQuoteChar: `'`,
    },
    json: {
        replacements: [{
            pattern: /"templateUrl":\s*"([\w.\\\/]+\.pug)"/g,
            replacementWord: 'template',
            renderer: renderPug
        }, {
            pattern: /"styleUrls":\s*\[\s*((?:"[\w.\\\/]+\.scss",?\s*)+)\s*]/g,
            filePattern: /[\w.\\\/]+/g,
            replacementWord: 'styles',
            renderer: renderSass
        }],
        quotePattern: /"/g,
        quoteReplaceChar: `\\"`,
        propertyQuoteChar: `"`,
        valueQuoteChar: `"`,
    }
};

function renderChildFile(formatConfig, sourceFile, renderer, childFileName) {
    let dirpath = path.relative(path.resolve(sourceFile.cwd, 'dist'), path.dirname(sourceFile.path));
    let childPath = path.resolve('src', dirpath, childFileName);
    return renderer(childPath).replace(formatConfig.quotePattern, formatConfig.quoteReplaceChar);
}

function valueQuoteWrapper(formatConfig) {
    return content => `${formatConfig.valueQuoteChar}${content}${formatConfig.valueQuoteChar}`;
}

const buildTemplate = through.obj(function transform(file, encoding, callback) {
    let contents = file.contents.toString(encoding);
    let formatConfig = REPLACE_CONFIG[path.extname(file.path).substring(1)];
    let wrapInValueQuotes = valueQuoteWrapper(formatConfig);
    if (_.some(formatConfig.replacements, replacementConfig => contents.match(replacementConfig.pattern))) {
        formatConfig.replacements.forEach(replacementConfig => {
            contents = contents.replace(replacementConfig.pattern, (match, cap) => {
                let replacementContent;
                if (replacementConfig.filePattern) {
                    let childFileContents = _.map(cap.match(replacementConfig.filePattern), childFileName => renderChildFile(formatConfig, file, replacementConfig.renderer, childFileName));
                    replacementContent = `[${wrapInValueQuotes(childFileContents.join(wrapInValueQuotes(',')))}]`;
                } else {
                    replacementContent = wrapInValueQuotes(renderChildFile(formatConfig, file, replacementConfig.renderer, cap));
                }
                let propertyName = `${formatConfig.propertyQuoteChar}${replacementConfig.replacementWord}${formatConfig.propertyQuoteChar}`;
                return `${propertyName}: ${replacementContent}`;
            });
        });
        file.contents = new Buffer(contents);
        return callback(null, file);
    }

    callback(null);
});

gulp.task('build-templates', () => {
    return gulp.src(['./dist/**/*.js', './dist/**/*.metadata.json', '!*.umd.js'])
        .pipe(buildTemplate)
        .pipe(gulp.dest('./dist'));
});