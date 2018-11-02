# gulp-package-version-format

[![npm version](https://badge.fury.io/js/gulp-package-version-format.svg)](https://badge.fury.io/js/gulp-package-version-format)
[![Build Status](https://travis-ci.org/ishi720/gulp-package-version-format.svg?branch=master)](https://travis-ci.org/ishi720/gulp-package-version-format)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6c2b423ed00841af847d28e018730b67)](https://www.codacy.com/app/ishi720/gulp-package-version-format?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ishi720/gulp-package-version-format&amp;utm_campaign=Badge_Grade)

## 概要

package.jsonのバージョン表記を単純化するgulpのプラグインです。

現在は`^`のみ対応しております。

> ### 例
>
> ^1.2.3 →　1.x.x
>
> ^0.1.2 →　0.1.x
>
> ^0.0.1 →　0.0.1

## インストール

```
npm i gulp-package-version-format
```

```
yarn add gulp-package-version-format
```


## 使い方

gulpfile.jsに以下のような記述をする。

```js
var versionFormat = require('gulp-package-version-format');

gulp.task('versionFormat', function(){
    gulp.src('./package.json')
        .pipe(versionFormat())
        .pipe(gulp.dest('./'));
});
```

gulpコマンドで実行します。

```
gulp versionFormat
```
