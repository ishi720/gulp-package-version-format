# gulp-package-version-format

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
