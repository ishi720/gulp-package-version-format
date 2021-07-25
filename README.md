# gulp-package-version-format

## Description

A gulp plugin to unify the package.json version notation.

package.jsonのバージョン表記を統一化するgulpのプラグインです。

> ### sample
>
> ^1.2.3 →　1.x.x
>
> ^0.1.2 →　0.1.x
>
> ^0.0.1 →　0.0.1

## Badge

[![npm version](https://badge.fury.io/js/gulp-package-version-format.svg)](https://badge.fury.io/js/gulp-package-version-format)
![npm version](https://img.shields.io/npm/dt/gulp-package-version-format.svg)
[![Build Status](https://travis-ci.com/ishi720/gulp-package-version-format.svg?branch=master)](https://travis-ci.com/ishi720/gulp-package-version-format)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6c2b423ed00841af847d28e018730b67)](https://www.codacy.com/app/ishi720/gulp-package-version-format?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ishi720/gulp-package-version-format&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/ishi720/gulp-package-version-format/badge.svg)](https://coveralls.io/github/ishi720/gulp-package-version-format)


## Install

```bash
npm i gulp-package-version-format
```

```bash
yarn add gulp-package-version-format
```

## API

gulpfile.js

```js
const versionFormat = require('gulp-package-version-format');

gulp.task('versionFormat', () => {
    return gulp.src('./package.json')
        .pipe(versionFormat())
        .pipe(gulp.dest('./'));
});
```

## Options

```js
versionFormat({
    'wildcard': '*'
})
```

|option|default|description|
|:----:|:----:|:----:|
|wildcard|x| Specifies the wildcard to use.<br> x or X or \* |

## Run

```bash
gulp versionFormat
```
