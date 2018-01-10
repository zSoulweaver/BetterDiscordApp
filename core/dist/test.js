const { BetterDiscord } = require('./main.js');

const _bd = new BetterDiscord();

const fileUtils = _bd.fileUtils;

//console.log(fileUtils.readJsonFromFile);

function dirExistsTest() {
    fileUtils.readJsonFromFile('test.json').then(data => {
        if(data.err) {
            console.log("ERR");
            console.log(data);
        } else {
            console.log(data);
        }
    }).catch(err => { console.log(err) });
}


String.prototype.padLeft = Number.prototype.padLeft = function(prefix, len) {
    let str = this.toString();
    while(str.length < len) str = prefix + str;
    return str;
}

String.prototype.padRight = Number.prototype.padLeft = function(suffix, len) {
    let str = this.toString();
    while(str.length < len) str = str + suffix;
    return str;
}

//console.log("".padStart);
//
//let date = new Date();
//let dateString = `[${date.getDate().padLeft("0", 2)}/${date.getMonth()+1}/${date.getYear()}]`;
//console.log(dateString);
//dirExistsTest();


const original = String.prototype.toString;
String.prototype.toString = function() {
    let str = original.apply(this);
    if(str === "foo") return "bar";
    return str;
}

String.prototype.toString = proxy;