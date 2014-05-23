module.exports = function(grunt) {

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            uses_defaults: [
                'app.js', 
                '{adapter,cli,config,controllers,helpers,models,services,test,validator}/**/*.js'
            ]
        }
    });
    
    // Default task(s).
    grunt.registerTask('default', ['jshint']);
};