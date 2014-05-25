module.exports = function(grunt) {

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: false,
                globals: {
                    // Node
                    "require"   : false,
                    "module"    : false,
                    "process"   : false,
                    // Mocha
                    "describe"  : false,
                    "it"        : false,
                    "before"    : false,
                    "beforeEach": false,
                    "after"     : false,
                    "afterEach" : false
                },
                ignores: [
                    'node_modules'
                ]
            },
            all: [
                'app.js', 
                '{adapter,cli,config,controllers,helpers,models,services,test,validator}/**/*.js'
            ]
        },
        nodemon: {
            dev: {
                script: 'app.js',
            }
        }
    });
    
    // Default task(s).
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('dev', ['nodemon']);
};