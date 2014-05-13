var readline    = require('readline'),
    clc         = require('cli-color'),
    _           = require('underscore'),
    when        = require('when'),
    sequence    = require('when/sequence');

/** 
 * Create new asker
 * 
 * @constructor 
 */
function Asker(questions, options) {
    options = options || {};
    
    if (!_.isArray(questions)) {
        throw "questions is not an Array";
    }
    
    this.questions = questions;
    this.response = {};
    this.cli = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    this.askCallback = null;
    this.errorMsg = options.errorMsg || clc.xterm(160);
    this.currentQuestion = 0;
}

/** 
 * Launch the pool of questions
 * 
 * @param {function} askCallback
 */
Asker.prototype.ask = function(askCallback) {
    if (!_.isFunction(askCallback)) {
        throw "askCallback is not a function";
    }
    
    this.askCallback = askCallback;
    this.askOne(1);
};

/** 
 * Close the console
 */
Asker.prototype.close = function(code) {
    code = code || 0;
    process.exit(code);
};

/** 
 * Print error message
 */
Asker.prototype.printError = function(message) {
    console.log(this.errorMsg(message));
};

/** 
 * Ask one question in the CLI
 * 
 * @param {options} options
 */
Asker.prototype.askOne = function(questionNumber) {
    var asker = this;
    
    if (questionNumber > asker.questions.length 
            || questionNumber <= 0) {
        throw "the question #" + questionNumber + " doesn't exist";
    }
    
    asker.currentQuestion = questionNumber;
    var options = asker.questions[questionNumber - 1];
    
    asker.cli.question(options.ask + ': ', function(answer) {
        sequence(options.validate, answer).then(function() {
            asker.response[options.key] = answer;
            asker.nextStep();
        }, function(err) {
            asker.printError(err.message);
            asker.askOne(questionNumber);
        });
    });
};

/** 
 * Launch the next step (Continue or close)
 */
Asker.prototype.nextStep = function() {
    // if it's the last question
    // call the ask callback and close the console
    // else call the next question
    if (this.currentQuestion == this.questions.length) {
        this.askCallback(this.response);
    } else {
        this.askOne(this.currentQuestion + 1);
    }
};

module.exports = Asker;