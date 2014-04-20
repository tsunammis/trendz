/**
 * Grunt Module
 */
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            assets: 'public/assets',
            assets_css: '<%= project.assets %>/css',
            src: 'styles',
            css: [
                '<%= project.src %>/style.scss'
            ]
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: true
                },
                files: {
                    '<%= project.assets_css %>/style.css': '<%= project.css %>'
                }
            }
        },
        watch: {
            sass: {
                files: '<%= project.src %>/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    /**
     * Default task
     * Run `grunt` on the command line
     */
    grunt.registerTask('default', [
        'sass:dev',
        'watch'
    ]);
};