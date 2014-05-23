module.exports = function(grunt) {

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
    
    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    // Default task(s).
    grunt.registerTask('default', ['jshint']);
};