'use strict';

const through = require('through2');
const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-package-version-format';

module.exports = function(arg) {

    // wild card
    let wildcard = 'x';
    if ( typeof arg !== 'undefined'){
        if ( arg.wildcard.match(/^[*|x|X]$/) ) {
            wildcard = arg.wildcard;
        }
    }

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
            return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        // メイン処理
        const dataJson = JSON.parse(file.contents.toString('utf8'));
        const depNames = ['dependencies','devDependencies','peerDependencies','optionalDependencies','bundledDependencies'];

        depNames.forEach( function(depName) {
            for(var pacName in dataJson[depName]){
                dataJson[depName][pacName] = versionFormat(dataJson[depName][pacName], wildcard);
            }
        });

        //json整形
        file.contents = Buffer.from( JSON.stringify( dataJson, null, 2 ) + '\n' );

        this.push(file);
        callback();
    };
    return through.obj(transform);
};


function versionFormat( version, wildcard='x') {

    // wild card set
    if ( !wildcard.match(/^[*|x|X]$/) ) {
        wildcard = 'x';
    }

    // Skip if revisions are specified
    if ( (version.match( /\./g ) || [] ).length >= 3) {
        return version;
    }

    if ( version.match(/^\^/) ) {
        if ( version.match(/\^0\.0\..+$/) ){
            //^0.0.5 -> 0.0.5
            return version.replace(/^\^0\.0\.(.+)$/, '0.0.'+'$1' );
        } else if ( version.match(/^\^0\.\d+\..+$/) ) {
            //^0.5.5 -> 0.5.x
            return version.replace(/^\^0\.(\d+)..+$/, '0.'+'$1'+'.'+ wildcard );
        } else if ( version.match(/^\^\d+\.\d+\..+$/) ) { 
            //^5.5.5 -> 5.x.x
            return version.replace(/^\^(\d+)\.\d+\..+$/, '$1'+'.'+ wildcard +'.'+ wildcard );
        } else if ( version.match(/^\^\d+$/) ) { 
            //^5 -> 5.x.x
            return version.replace(/^\^(\d+)$/, '$1'+'.'+ wildcard +'.'+ wildcard );
        } else if ( version.match(/^\^0\.\d+$/) ) { 
            //^0.5 -> 0.5.x
            return version.replace(/^\^(0\.\d+)$/, '$1'+'.'+ wildcard  );
        } else if ( version.match(/^\^\d+\.\d+$/) ) { 
            //^5.5 -> 5.x.x
            return version.replace(/^\^(\d+)\.\d+$/, '$1'+'.'+ wildcard +'.'+ wildcard );
        } else {
            return version;
        } 
    } else if ( version.match(/^~/) ) {
        if ( version.match(/~\d+$/) ) {
            //~5 -> 5.x.x
            return version.replace(/~(\d+)$/, '$1'+'.'+ wildcard +'.'+ wildcard );
        } else if ( version.match(/~0\.\d+$/) ) { 
            //0.5 -> 0.5.x
            return version.replace(/~(0\.\d+)$/, '$1'+'.'+ wildcard  );
        } else if ( version.match(/~\d+\.\d+$/) ) { 
            //5.5 -> 5.5.x
            return version.replace(/~(\d+\.\d+)$/, '$1'+'.'+ wildcard );
        } else {
            return version;
        }
    } else {
        if ( version.match(/^\d+\.[*|x|X]\.[*|x|X]$/) ){
            //5.x.x -> 5.*.*
            return version.replace(/^(\d+)\.[*|x|X]\.[*|x|X]$/, '$1'+'.'+ wildcard +'.'+ wildcard );
        } else if ( version.match(/^\d+\.\d+.[*|x|X]$/) ) {
            //5.5.x -> 5.5.*
            return version.replace(/^(\d+\.\d+)\.[*|x|X]$/, '$1'+'.'+ wildcard );
        } else if ( version.match(/^\d+$/) ) {
            //5 -> 5.x.x
            return version.replace(/^(\d+)$/, '$1'+'.'+ wildcard +'.'+ wildcard );
        } else if ( version.match(/^0\.\d+$/) ) { 
            //0.5 -> 0.5.x
            return version.replace(/^(0\.\d+)$/, '$1'+'.'+ wildcard  );
        } else if ( version.match(/^\d+\.\d+$/) ) { 
            //5.5 -> 5.5.x
            return version.replace(/^(\d+\.\d+)$/, '$1'+'.'+ wildcard );
        } else {
            return version;
        }
    }
}

module.exports.versionFormat = versionFormat;