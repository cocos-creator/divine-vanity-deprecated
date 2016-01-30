var Path = require('path');
var xlsxj = require('xlsx-to-json');

module.exports = {
    load: function () {
    },

    unload: function () {
    },

    'nantas-excel-to-json:open': function () {
        Editor.Panel.open('nantas-excel-to-json.panel');
    },
//
    'nantas-excel-to-json:parse': function (event, opts) {
        console.log('processing excel parse...');
        console.log('src: ' + opts.srcPath + ' outname: ' + opts.outName);
        var outPath = Path.join(Path.dirname(opts.srcPath), opts.outName);
        xlsxj({
            input: opts.srcPath,  // input xls
            output: outPath,  // output json
        }, function(err, result) {
            if(err) {
                console.error(err);
                return;
            }
            Editor.log("Convert excel to json complete: " + outPath);
        });
    }
};
