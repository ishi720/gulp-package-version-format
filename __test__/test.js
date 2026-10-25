const gulp = require('gulp');
const gulpPackageVersionFormat = require('./../index');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

describe('Prefix Caret Test', () => {
    it('^5.5.5 -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5.5')).toBe('5.x.x');
    });
    it('^5.5.5.5 -> ^5.5.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5.5.5')).toBe('^5.5.5.5');
    });
    it('^0.5.5 -> 0.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^0.5.5')).toBe('0.5.x');
    });
    it('^0.0.5 -> 0.0.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('^0.0.5')).toBe('0.0.5');
    });
    it('^5.5.5-alpha -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5.5-alpha')).toBe('5.x.x');
    });
    it('^0.5.5-alpha -> 0.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^0.5.5-alpha')).toBe('0.5.x');
    });
    it('^0.0.5-alpha -> 0.0.5-alpha', () => {
        expect(gulpPackageVersionFormat.versionFormat('^0.0.5-alpha')).toBe('0.0.5-alpha');
    });
    it('^555.555.555 -> 555.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^555.555.555')).toBe('555.x.x');
    });
    it('^5.5.X -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5.X')).toBe('5.x.x');
    });
    it('^5 -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5')).toBe('5.x.x');
    });
    it('^5.5 -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5')).toBe('5.x.x');
    });
    it('^0.5 -> 0.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^0.5')).toBe('0.5.x');
    });
    it('^005.5.5 -> 005.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^005.5.5')).toBe('005.x.x');
    });
    it('^hello -> ^hello', () => {
        expect(gulpPackageVersionFormat.versionFormat('^hello')).toBe('^hello');
    });
    it('^5.5.5,X -> 5.X.X', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5.5','X')).toBe('5.X.X');
    });
    it('^5.5.5,* -> 5.*.*', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5.5','*')).toBe('5.*.*');
    });
    it('^5.5.5,test -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5.5','test')).toBe('5.x.x');
    });
    it('^5.5.5,| -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('^5.5.5','|')).toBe('5.x.x');
    });
})


describe('Prefix Tilde Test', () => {
    it('~5.5.5 -> ~5.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5.5.5')).toBe('~5.5.5');
        //expect(gulpPackageVersionFormat.versionFormat('~5.5.5')).toBe('5.5.x');
    });
    it('~5.5.5.5 -> ~5.5.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5.5.5.5')).toBe('~5.5.5.5');
    });
    it('~0.5.5 -> ~0.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('~0.5.5')).toBe('~0.5.5');
        //expect(gulpPackageVersionFormat.versionFormat('~0.5.5')).toBe('0.5.x');
    });
    it('~0.0.5 -> ~0.0.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('~0.0.5')).toBe('~0.0.5');
        //expect(gulpPackageVersionFormat.versionFormat('~0.0.5')).toBe('0.0.5');
    });
    it('~5.5.5-alpha -> ~5.5.5-alpha', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5.5.5-alpha')).toBe('~5.5.5-alpha');
        //expect(gulpPackageVersionFormat.versionFormat('~5.5.5-alpha')).toBe('5.5.x');
    });
    it('~0.5.5-alpha -> ~0.5.5-alpha', () => {
        expect(gulpPackageVersionFormat.versionFormat('~0.5.5-alpha')).toBe('~0.5.5-alpha');
        //expect(gulpPackageVersionFormat.versionFormat('~0.5.5-alpha')).toBe('0.5.x');
    });
    it('~0.0.5-alpha -> ~0.0.5-alpha', () => {
        expect(gulpPackageVersionFormat.versionFormat('~0.0.5-alpha')).toBe('~0.0.5-alpha');
        //expect(gulpPackageVersionFormat.versionFormat('~0.0.5-alpha')).toBe('0.0.5-alpha');
    });
    it('~555.555.555 -> ~555.555.555', () => {
        expect(gulpPackageVersionFormat.versionFormat('~555.555.555')).toBe('~555.555.555');
        //expect(gulpPackageVersionFormat.versionFormat('~555.555.555')).toBe('555.555.x');
    });
    it('~5.5.X -> ~5.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5.5.X')).toBe('~5.5.X');
        //expect(gulpPackageVersionFormat.versionFormat('~5.5.X')).toBe('5.5.x');
    });
    it('~5 -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5')).toBe('5.x.x');
    });
    it('~5.5 -> 5.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5.5')).toBe('5.5.x');
    });
    it('~0.5 -> 0.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('~0.5')).toBe('0.5.x');
    });
    it('~005.5.5 -> ~005.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('~005.5.5')).toBe('~005.5.5');
        //expect(gulpPackageVersionFormat.versionFormat('~005.5.5')).toBe('005.5.x');
    });
    it('~hello -> ~hello', () => {
        expect(gulpPackageVersionFormat.versionFormat('~hello')).toBe('~hello');
    });
    it('~5.5.5,X -> ~5.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5.5.5','X')).toBe('~5.5.5');
        //expect(gulpPackageVersionFormat.versionFormat('~5.5.5','X')).toBe('5.5.X');
    });
    it('~5.5.5,* -> ~5.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5.5.5','*')).toBe('~5.5.5');
        //expect(gulpPackageVersionFormat.versionFormat('~5.5.5','*')).toBe('5.5.*');
    });
    it('~5.5.5,test -> ~5.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('~5.5.5','test')).toBe('~5.5.5');
        //expect(gulpPackageVersionFormat.versionFormat('~5.5.5','XtestX')).toBe('5.5.x');
    });
})


describe('Prefix None Test', () => {
    it('5.5.5 -> 5.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.5.5')).toBe('5.5.5');
    });
    it('5.5.5.5 -> 5.5.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.5.5.5')).toBe('5.5.5.5');
    });
    it('0.5.5 -> 0.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('0.5.5')).toBe('0.5.5');
    });
    it('0.0.5 -> 0.0.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('0.0.5')).toBe('0.0.5');
    });
    it('5.5.5-alpha -> 5.5.5-alpha', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.5.5-alpha')).toBe('5.5.5-alpha');
    });
    it('0.5.5-alpha -> 0.5.5-alpha', () => {
        expect(gulpPackageVersionFormat.versionFormat('0.5.5-alpha')).toBe('0.5.5-alpha');
    });
    it('0.0.5-alpha -> 0.0.5-alpha', () => {
        expect(gulpPackageVersionFormat.versionFormat('0.0.5-alpha')).toBe('0.0.5-alpha');
    });
    it('555.555.555 -> 555.555.555', () => {
        expect(gulpPackageVersionFormat.versionFormat('555.555.555')).toBe('555.555.555');
    });
    it('5.5.X -> 5.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.5.X')).toBe('5.5.x');
    });
    it('5 -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('5')).toBe('5.x.x');
    });
    it('5.5 -> 5.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.5')).toBe('5.5.x');
    });
    it('0.5 -> 0.5.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('0.5')).toBe('0.5.x');
    });
    it('005.5.5 -> 005.5.5', () => {
        expect(gulpPackageVersionFormat.versionFormat('005.5.5')).toBe('005.5.5');
    });
    it('hello -> hello', () => {
        expect(gulpPackageVersionFormat.versionFormat('hello')).toBe('hello');
    });
    it('5.x.x,X -> 5.X.X', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.x.x','X')).toBe('5.X.X');
    });
    it('5.x.x,* -> 5.*.*', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.x.x','*')).toBe('5.*.*');
    });
    it('5.X.X,test -> 5.x.x', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.X.X','test')).toBe('5.x.x');
    });
    it('5.|.| -> 5.|.|', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.|.|')).toBe('5.|.|');
    });
    it('5.5.| -> 5.5.|', () => {
        expect(gulpPackageVersionFormat.versionFormat('5.5.|')).toBe('5.5.|');
    });
})

const runGulp = async (option, dest, src = 'fixture/package.json') => {
    await pipeline(
        gulp.src(path.join(__dirname, src)),
        gulpPackageVersionFormat(option),
        gulp.dest(dest)
    );
    return JSON.parse(fs.readFileSync(path.join(dest, 'package.json'), 'utf8'));
};

describe('Gulp Exec Test', () => {
    it('"wildcard":"x" -> 1.x.x', async () => {
        const jsonObject1 = await runGulp({
            'wildcard': 'x'
        }, path.join(__dirname, 't1'));
        expect(jsonObject1.dependencies['plugin-error']).toBe('1.x.x');
    });
    it('"wildcard":"X" -> 1.X.X', async () => {
        const jsonObject2 = await runGulp({
            'wildcard': 'X'
        }, path.join(__dirname, 't2'));
        expect(jsonObject2.dependencies['plugin-error']).toBe('1.X.X');
    });
    it('"wildcard":"*" -> 1.*.*', async () => {
        const jsonObject3 = await runGulp({
            'wildcard': '*'
        }, path.join(__dirname, 't3'));
        expect(jsonObject3.dependencies['plugin-error']).toBe('1.*.*');
    });
    it('"wildcard":"" -> 1.x.x', async () => {
        const jsonObject4 = await runGulp({
            'wildcard': ''
        }, path.join(__dirname, 't4'));
        expect(jsonObject4.dependencies['plugin-error']).toBe('1.x.x');
    });
    it('"wildcard":"hello" -> 1.x.x', async () => {
        const jsonObject5 = await runGulp({
            'wildcard': 'hello'
        }, path.join(__dirname, 't5'));
        expect(jsonObject5.dependencies['plugin-error']).toBe('1.x.x');
    });
    it('"wildcard":"|" -> 1.x.x', async () => {
        const jsonObject8 = await runGulp({
            'wildcard': '|'
        }, path.join(__dirname, 't8'));
        expect(jsonObject8.dependencies['plugin-error']).toBe('1.x.x');
    });
    it('option {} -> 1.x.x', async () => {
        const jsonObject9 = await runGulp({}, path.join(__dirname, 't9'));
        expect(jsonObject9.dependencies['plugin-error']).toBe('1.x.x');
    });
    it('option null -> 1.x.x', async () => {
        const jsonObject10 = await runGulp(null, path.join(__dirname, 't10'));
        expect(jsonObject10.dependencies['plugin-error']).toBe('1.x.x');
    });
    it('"wildcard":1 -> 1.x.x', async () => {
        const jsonObject11 = await runGulp({
            'wildcard': 1
        }, path.join(__dirname, 't11'));
        expect(jsonObject11.dependencies['plugin-error']).toBe('1.x.x');
    });
    it('wildcard none', async () => {
        const jsonObject6 = await runGulp(undefined, path.join(__dirname, 't6'));
        expect(jsonObject6.dependencies['plugin-error']).toBe('1.x.x');
    });
    it('invalid json -> PluginError', async () => {
        await expect(runGulp(undefined, path.join(__dirname, 't7'), 'fixture/invalid.json'))
            .rejects.toMatchObject({
                plugin: 'gulp-package-version-format',
                fileName: path.join(__dirname, 'fixture/invalid.json'),
            });
    });
})
