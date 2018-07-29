'use strict';

var through = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function() {

  /**
   * @this {Transform}
   */
  var transform = function(file, encoding, callback) {

    // ファイルが指定されているかチェックする
    if (file.isNull()) {
      return callback(null, file);
    }

    // ストリームはサポートしない
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-package-version-notation', 'Streams not supported!'));
    }

    /* メイン処理 */
    var dataJson = JSON.parse(file.contents.toString('utf8'));

    
    for(var key in dataJson.devDependencies){

      var str = dataJson.devDependencies[key]; 

      //バージョン情報を書き換える
      if ( dataJson.devDependencies[key].match(/\^0\.0\.\d+$/) ){
        //^0.0.5 -> 0.0.5
        dataJson.devDependencies[key] = str.replace(/\^0\.0\.(\d+)$/, "0.0."+'$1' );
      } else if ( dataJson.devDependencies[key].match(/\^0\.\d+\.\d+$/) ) {
        //^0.5.5 -> 0.5.x
        dataJson.devDependencies[key] = str.replace(/\^0\.(\d+).(\d+)$/, "0."+'$1'+".x" );
      } else if ( dataJson.devDependencies[key].match(/\^\d\.\d+\.\d+$/) ) { 
        //^5.5.5 -> 5.x.x
        dataJson.devDependencies[key] = str.replace(/\^(\d+)\.(\d+).(\d+)$/, '$1'+".x.x" );
      }
    }

    //json整形
    file.contents = new Buffer( JSON.stringify( dataJson, null, "  " ));

    this.push(file);
    callback();
  };

  return through.obj(transform);
};
