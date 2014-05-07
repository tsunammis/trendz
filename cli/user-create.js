var readline    = require('readline'),
    clc         = require('cli-color'),
    console     = require('console');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var greenClc = clc.xterm(155);
var redMsg = clc.xterm(160);

console.log("");
console.log(greenClc("|                       |     "));
console.log(greenClc("|--- ,---.,---.,---.,---|,---,"));
console.log(greenClc("|    |    |---'|   ||   | .-' "));
console.log(greenClc("`---'`    `---'`   '`---''---'"));
console.log("");

console.log("Interactive shell to add new user.");

rl.write('test');
rl.write('test');

askQuestion();

function askQuestion() {
    rl.question("email: ", function(answer) {

            if (answer.length > 3) {

            } else {
                console.log(redMsg("[KO]"));
                askQuestion();
            }

    });
}
