module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var config = {
        _fe: 'fe',
        _static: 'static',
        _tmp: 'fe/tmp',
        _prefixed: 'fe/tmp/prefixed',
        _assets: 'fe/assets',
        _static_assets: 'static/assets',
        _console: 'fe/console',
        _console_src: 'fe/console/src',
        _console_dist: 'fe/console/dist',

        _www: 'fe/www',
        _www_src: 'fe/www/src',
        _www_dist: 'fe/www/dist',


        _vendor: 'bower_components'
    };

    grunt.initConfig({
        config: config,
        clean: {
            vendor: {
                src: '<%= config._static %>/vendor/*'
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= config._static %>',
                    src: '**/*.js'
                }, {
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: '**/*/dist/**/*.js'
                }, {
                    expand: true,
                    cwd: '<%= config._tmp %>',
                    src: '**/*.js'
                }]
            },
            css: {
                // files:['<%= config._static %>/**/*.css',
                //     '<%= config._fe %>/**/*/dist/**/*.css',
                //     '<%= config._tmp %>/**/*.css']
                files: [{
                    expand: true,
                    cwd: '<%= config._static %>',
                    src: '**/*.css'
                }, {
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: '**/*/dist/**/*.css',
                }, {
                    expand: true,
                    cwd: '<%= config._tmp %>',
                    src: '**/*.css'
                }]
            },
            statics: {
                src: ['<%= config._static %>/*', '<%= config._tmp %>/*']
            }

        },
        less: {
            options: {
                compress: false
            },
            assets:{
                files: [{
                    expand: true,
                    cwd: '<%= config._assets %>',
                    src: '**/*.less',
                    dest: '<%= config._static_assets %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            console: {
                files: [{
                    expand: true,
                    cwd: '<%= config._console_src %>',
                    src: '**/*.less',
                    dest: '<%= config._console_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            www: {
                files: [{
                    expand: true,
                    cwd: '<%= config._www_src %>',
                    src: '**/*.less',
                    dest: '<%= config._www_dist %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 2% in US', 'last 4 versions', 'IE 9', 'IE 10']
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: '**/*/dist/**/*.css',
                    dest: '<%= config._prefixed %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config._prefixed %>',
                    src: '**/*/dist/**/*.css',
                    dest: '<%= config._fe %>/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                undef: true,
                unused: true,
                debug: true,
                // '-W015': true,
                predef: ['$', 'console'],
                globals: {
                    jQuery: true,
                    nodejs: true
                },
                ignores: []
            },
            target: {

                // files: [{
                //     expand: true,
                //     cwd: '<%= config._fe %>',
                //     src: '**/*/src/**/*.js',
                // }]

            }
        },

        // concat: {
        //     options:{
        //         separator:';'
        //     },
        //     console:{
        //         files: [{
        //             expand: true,
        //             cwd: '<%= config._console_src %>',
        //             src: '**/*.js',
        //             dest: '<%= config._prefixed %>/console/dist/js/console.js'
        //         }]
        //     },
        //     www:{
        //         files: [{
        //             expand: true,
        //             cwd: '<%= config._www_src %>',
        //             src: '**/*.js',
        //             dest: '<%= config._prefixed %>/www/dist/www.js'
        //         }]
        //     }
        // },
        uglify: {
            console: {
                files: [{
                    expand: true,
                    cwd: '<%= config._console_src %>',
                    src: '**/*.js',
                    dest: '<%= config._console_dist %>',
                    ext: '.js',
                    extDot: 'last'
                }]
            },
            www: {
                files: [{
                    expand: true,
                    cwd: '<%= config._www_src %>',
                    src: '**/*.js',
                    dest: '<%= config._www_dist %>',
                    ext: '.js',
                    extDot: 'last'
                }]
            }
        },
        copy: {
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: ['assets/**/*'],
                    dest: '<%= config._static %>'
                }]
            },
            vendor: {
                files: [{
                    expand: true,
                    cwd: '<%= config._vendor %>',
                    src: ['**/*/dist/**/*'],
                    filter: function() {
                        if (arguments[0].indexOf('node_modules') > -1 || arguments[0].indexOf('/src/') > -1) {
                            return false;
                        }
                        return true;
                    },
                    dest: '<%= config._static %>/vendor/'
                }]
            },
            mincss: {
                files: [{
                    expand: true,
                    cwd: '<%= config._console_dist %>',
                    src: '**/*.css',
                    dest: '<%= config._static %>/console/dist/css/',
                    ext: '.css',
                    extDot: 'last'
                }, {
                    expand: true,
                    cwd: '<%= config._www_dist %>',
                    src: '**/*.css',
                    dest: '<%= config._static %>/www/dist/css/',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            prefixed: {
                files: [{
                    expand: true,
                    cwd: '<%= config._prefixed %>',
                    src: '**/*/dist/**/*.css',
                    dest: '<%= config._static %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= config._fe %>',
                    src: '**/*/dist/**/*.js',
                    filter: function() {
                        if (arguments[0].indexOf('node_modules') > -1 || arguments[0].indexOf('/src/')) {
                            return false;
                        }
                        return true;
                    },
                    dest: '<%= config._static %>',
                    ext: '.js',
                    extDot: 'last'
                }]
            },
            sourcejs: {
                files: [{
                    expand: true,
                    cwd: '<%= config._console_src %>',
                    src: '**/*.js',
                    dest: '<%= config._static %>/console/dist/',
                    ext: '.js',
                    extDot: 'last'
                }, {
                    expand: true,
                    cwd: '<%= config._www_src %>',
                    src: '**/*.js',
                    dest: '<%= config._static %>/www/dist/',
                    ext: '.js',
                    extDot: 'last'
                }]
            }
        },
        watch: {
            options: {
                // reload: true,
                // livereload: true,
                interrupt: false,
                spawn: true
            },
            gconf: {
                options: {
                    reload: true
                },
                files: 'Gruntfile.js'
            },
            css: {
                options: {
                    interrupt: true,
                    spawn: true
                },
                files: '<%= config._fe %>/**/*/src/**/*.less',
                tasks: ['newer:less', 'newer:autoprefixer', 'newer:copy:prefixed']
            },
            js: {
                options: {
                    interrupt: true,
                },
                files: '<%= config._fe %>/**/*/src/**/*.js',
                tasks: ['newer:jshint', 'newer:copy:sourcejs']
            },
            jinja: {
                options: {
                    livereload: true
                },
                files: '**/*.jinja'
            }
        }
    });
    grunt.registerTask('lesser', ['less', 'autoprefixer']); //autoprefixer -->  config._prefixed
    grunt.registerTask('clesser', ['clean', 'less', 'autoprefixer']);
    grunt.registerTask('jser', [/*'jshint', */'uglify', 'copy:js']); // uglify --> config.**dist
    grunt.registerTask('jssrc', [/*'jshint', */'copy:sourcejs']);
    grunt.registerTask('css2dev', ['lesser', 'copy:prefixed']);
    grunt.registerTask('css2serve', ['clesser', 'cssmin', 'copy:mincss']);
    grunt.registerTask('dev', ['css2dev', 'jssrc', 'copy:vendor', 'copy:assets', 'watch']);
    grunt.registerTask('serve', ['css2serve', 'jser', 'copy:vendor', 'copy:assets']);
    grunt.registerTask('default', ['watch']);

};
