/**
 * (c) Stéphane Depierrepont <toorop@toorop.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};


module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/**\n' +
            '* <%= pkg.name %> v<%= pkg.version %> by @poroot (toorop@toorop.fr)o\n' +
            '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '*/\n',


        livereload: {
            port: 35729 // Default livereload listening port.
        },

        connect: {
            livereload: {
                options: {
                    port: 9001,
                    middleware: function (connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)]
                    }
                }
            }
        },
        less: {
            options: {
                banner: '<%= banner %>'
            },
            development: {
                options: {
                    banner: 'TOTO',
                    paths: ["stylesheets/less/", "vendors/bootstrap/less/"],
                    yuicompress: false
                },
                files: {
                    "dist/stylesheets/app.css": "stylesheets/less/app.less"
                }
            },
            production: {
                options: {
                    banner: '<%= banner %>',
                    paths: ["stylesheets/less/", "vendors/bootstrap/less/"],
                    yuicompress: true
                },
                files: {
                    "dist/stylesheets/app.min.css": "stylesheets/less/app.less"
                }
            }
        },

        // javascript
        concat: {
            bootstrap: {
                src: [
                    'vendors/bootstrap/js/transition.js',
                    'vendors/bootstrap/js/alert.js',
                    'vendors/bootstrap/js/button.js',
                    'vendors/bootstrap/js/carousel.js',
                    'vendors/bootstrap/js/collapse.js',
                    'vendors/bootstrap/js/dropdown.js',
                    'vendors/bootstrap/js/modal.js',
                    'vendors/bootstrap/js/tooltip.js',
                    'vendors/bootstrap/js/popover.js',
                    'vendors/bootstrap/js/scrollspy.js',
                    'vendors/bootstrap/js/tab.js',
                    'vendors/bootstrap/js/affix.js'
                ],
                dest: 'dist/javascripts/bootstrap.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            bootstrap: {
                src: ['<%= concat.bootstrap.dest %>'],
                dest: 'dist/javascripts/bootstrap.min.js'
            },
            app: {
                src: ['javascripts/app.js'],
                dest: 'dist/javascripts/app.min.js'
            }
        },


        /*
         jshint: {
         // define the files to lint
         files: ['js/src/*.js'],
         // configure JSHint (documented at http://www.jshint.com/docs/)
         options: {
         jquery: true,
         unused: true,
         strict: true,
         asi: true,
         node: true,
         validthis: true,
         laxcomma: true,
         laxbreak: true,
         browser: true,
         eqnull: true,
         debug: true,
         devel: true,
         boss: true,
         expr: true,

         //lastsemic: true,
         // more options here if you want to override JSHint defaults
         globals: {

         console: true,
         module: true
         }
         }
         }, */

        // Copy
        copy: {
            main: {
                files: [
                    {expand: false, src: ['vendors/bootstrap/assets/js/html5shiv.js'], dest: 'dist/javascripts/html5shiv.js'},
                    {expand: false, src: ['vendors/bootstrap/assets/js/html5shiv.js'], dest: 'dist/javascripts/respond.min.js'},
                    {expand: false, src: ['javascripts/app.js'], dest: 'dist/javascripts/app.js'},
                ]
            }
        },


        // Configuration to be run (and then tested)
        regarde: {
            index: {
                files: ['*.html'],
                tasks: ['livereload']
            },
            css: {
                files: 'vendors/bootstrap/less/*.less',
                //tasks: ['less', 'copy', 'livereload']
                tasks: ['less']
            },
            js: {
                files: ['vendors/bootstrap/js/*.js', 'javascripts/app.js'],
                //tasks: ['concat', 'jshint', 'uglify', 'copy', 'livereload']
                tasks: ['concat', 'uglify', 'livereload']
            }
        }

    });

    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //grunt.registerTask('default', ['less', 'concat', 'uglify', 'copy']);
    //grunt.registerTask('build', ['less', 'concat', 'copy', 'uglify']);
    grunt.registerTask('build', ['less', 'concat', 'uglify', 'copy']);

    grunt.registerTask('server', ['livereload-start', 'connect', 'regarde']);
};



