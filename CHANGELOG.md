# Changelog

このプロジェクトの主な変更点を記録します。
形式は [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に、バージョンは [Semantic Versioning](https://semver.org/lang/ja/) に従います。

## [1.7.0] - 2026-10-25

### Added

- `CHANGELOG.md` を追加
- `package.json` に `engines` (`node >= 10.13.0`) を追加

### Changed

- `plugin-error` を 2.x に更新
- 開発環境を更新 (gulp 5, jest 30, eslint 10 / flat config)
- CI を Travis CI から GitHub Actions へ移行

### Fixed

- 不正な JSON を渡すと例外で落ちていた問題を修正し、`PluginError` を返すように変更
- `wildcard` を指定せずにオプションを渡すと例外になる問題を修正
- 不正な `wildcard` が指定された場合は既定値の `x` を使うように統一
- 正規表現の `.` や文字クラス内の `|` によって、意図しない表記が変換対象になる問題を修正

## [1.6.1] - 2020-07-01

### Changed

- `through2` を 4.x に更新
- 対応する Node.js のバージョン範囲を見直し

## [1.6.0] - 2019-09-06

### Added

- チルダ (`~`) 指定の一部に対応 (`~5` → `5.x.x`, `~5.5` → `5.5.x`)

## [1.5.4] - 2019-05-28

### Added

- プレフィックスなしの表記に完全対応 (`5` → `5.x.x`, `5.5` → `5.5.x`)

## [1.5.3] - 2019-04-24

### Added

- テストケースとカバレッジ出力を追加

## [1.5.2] - 2019-04-18

### Added

- gulp 実行時のテストを追加

## [1.5.1] - 2019-04-04

### Added

- オプション `wildcard` でワイルドカード (`x`, `X`, `*`) を指定可能に

### Fixed

- 1.5.0 の不具合を修正

## [1.4.0] - 2019-04-03

### Added

- キャレット (`^`) 指定に完全対応 (`^5`, `^5.5`, `^0.5` など)

## [1.3.2] - 2019-01-28

### Changed

- jest を更新

## [1.3.1] - 2019-01-08

### Changed

- ESLint を導入

## [1.3.0] - 2018-12-20

### Changed

- 非推奨の `gulp-util` を廃止し、`plugin-error` に置き換え
- `through2` を 3.x に更新

## [1.2.0] - 2018-12-06

### Added

- プレリリース付きの表記に対応 (`^5.5.5-alpha` → `5.x.x`)

## [1.1.3] - 2018-11-02

### Changed

- 非推奨の `new Buffer()` を `Buffer.from()` に置き換え

## [1.1.2] - 2018-11-01

### Changed

- 出力する package.json の末尾に改行を追加

## [1.1.1] - 2018-09-20

### Fixed

- メジャーバージョンが2桁以上の場合に正しく変換されない問題を修正

## [1.1.0] - 2018-08-01

### Added

- `dependencies` / `devDependencies` / `peerDependencies` / `optionalDependencies` / `bundledDependencies` の5種類に対応

## [1.0.0] - 2018-07-29

- 初回リリース

[1.7.0]: https://github.com/ishi720/gulp-package-version-format/compare/1.6.1...1.7.0
[1.6.1]: https://github.com/ishi720/gulp-package-version-format/compare/1.6.0...1.6.1
[1.6.0]: https://github.com/ishi720/gulp-package-version-format/compare/1.5.4...1.6.0
[1.5.4]: https://github.com/ishi720/gulp-package-version-format/compare/1.5.3...1.5.4
[1.5.3]: https://github.com/ishi720/gulp-package-version-format/compare/1.5.2...1.5.3
[1.5.2]: https://github.com/ishi720/gulp-package-version-format/compare/1.5.1...1.5.2
[1.5.1]: https://github.com/ishi720/gulp-package-version-format/compare/1.4.0...1.5.1
[1.4.0]: https://github.com/ishi720/gulp-package-version-format/compare/1.3.2...1.4.0
[1.3.2]: https://github.com/ishi720/gulp-package-version-format/compare/1.3.1...1.3.2
[1.3.1]: https://github.com/ishi720/gulp-package-version-format/compare/1.3.0...1.3.1
[1.3.0]: https://github.com/ishi720/gulp-package-version-format/compare/1.2.0...1.3.0
[1.2.0]: https://github.com/ishi720/gulp-package-version-format/compare/1.1.3...1.2.0
[1.1.3]: https://github.com/ishi720/gulp-package-version-format/compare/1.1.2...1.1.3
[1.1.2]: https://github.com/ishi720/gulp-package-version-format/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/ishi720/gulp-package-version-format/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/ishi720/gulp-package-version-format/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/ishi720/gulp-package-version-format/releases/tag/1.0.0
