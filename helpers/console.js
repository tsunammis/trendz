var clc              = require('cli-color'),
    colorGreen       = clc.xterm(155),
    colorRed         = clc.xterm(160),
    colorHighlightOk = clc.xterm(15).bgXterm(22);
    
var banner = function() {
    console.log("");
    console.log(colorGreen("|                       |     "));
    console.log(colorGreen("|--- ,---.,---.,---.,---|,---,"));
    console.log(colorGreen("|    |    |---'|   ||   | .-' "));
    console.log(colorGreen("`---'`    `---'`   '`---''---'"));
    console.log("");
};

var ok = function(message) {
    console.log(colorGreen(message));
};

var error = function(message) {
    console.log(colorRed(message));
};

var line = function(message) {
    message = message || '';
    console.log(message);
};

module.exports = {
    banner: banner,
    ok: ok,
    error: error,
    line: line,
    colorHighlightOk: colorHighlightOk,
    
    colorGreen: colorGreen, 
    colorRed: colorRed,
    colorHighlightOk: colorHighlightOk,
    colorOk: colorGreen
};