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
        var depNames = ['dependencies','devDependencies','peerDependencies','optionalDependencies','bundledDependencies'];

        depNames.forEach( function(depName) {
            for(var pacName in dataJson[depName]){
                dataJson[depName][pacName] = versionFormat(dataJson[depName][pacName]);
            }
        });

        //json整形
        file.contents = new Buffer.from( JSON.stringify( dataJson, null, 2 ) + '\n' );

        this.push(file);
        callback();
    };
    return through.obj(transform);
};

function versionFormat(version) {

    // Skip if revisions are specified
    if ( (version.match( /\./g ) || [] ).length >= 3) {
        return version;
    }

    if ( version.match(/\^0\.0\..+$/) ){
        //^0.0.5 -> 0.0.5
        return version.replace(/\^0\.0\.(.+)$/, '0.0.'+'$1' );
    } else if ( version.match(/\^0\.\d+\..+$/) ) {
        //^0.5.5 -> 0.5.x
        return version.replace(/\^0\.(\d+)..+$/, '0.'+'$1'+'.x' );
    } else if ( version.match(/\^\d+\.\d+\..+$/) ) { 
        //^5.5.5 -> 5.x.x
        return version.replace(/\^(\d+)\.\d+\..+$/, '$1'+'.x.x' );
    } else {
        return version;
    } 
}

module.exports.versionFormat = versionFormat;