'use strict';

const through = require('through2');
const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-package-version-format';

module.exports = function(arg) {

    // wild card
    const wildcard = normalizeWildcard(arg && arg.wildcard);

    /**
     * @this {Transform}
     */
    const transform = function(file, encoding, callback) {

        // ファイルが指定されているかチェックする
        if (file.isNull()) {
            return callback(null, file);
        }

        // ストリームはサポートしない
        if (file.isStream()) {
            return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        // メイン処理
        let dataJson;
        try {
            dataJson = JSON.parse(file.contents.toString('utf8'));
        } catch (e) {
            // JSONとして読めない場合はエラーを返す
            return callback(new PluginError(PLUGIN_NAME, e, { fileName: file.path }));
        }
        const depNames = ['dependencies','devDependencies','peerDependencies','optionalDependencies','bundledDependencies'];

        depNames.forEach( function(depName) {
            for(const pacName in dataJson[depName]){
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


// x, X, * 以外は既定値の x にする
function normalizeWildcard( wildcard ) {
    return ( typeof wildcard === 'string' && /^[*xX]$/.test(wildcard) ) ? wildcard : 'x';
}

function versionFormat( version, wildcard ) {

    // wild card set
    wildcard = normalizeWildcard(wildcard);

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
            return version.replace(/^\^0\.(\d+)\..+$/, '0.'+'$1'+'.'+ wildcard );
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
        if ( version.match(/^\d+\.[*xX]\.[*xX]$/) ){
            //5.x.x -> 5.*.*
            return version.replace(/^(\d+)\.[*xX]\.[*xX]$/, '$1'+'.'+ wildcard +'.'+ wildcard );
        } else if ( version.match(/^\d+\.\d+\.[*xX]$/) ) {
            //5.5.x -> 5.5.*
            return version.replace(/^(\d+\.\d+)\.[*xX]$/, '$1'+'.'+ wildcard );
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