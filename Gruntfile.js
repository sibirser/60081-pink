"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

      clean: {
        build: ["build"]
      },
      copy: {
        build: {
          files: [{
            expand: true,
            cwd: "source",
            src: [
              "img/**",
              "*.html"
            ],
            dest: "build"
          }]
        },
        bower: {
          files: [{
            expand: true,
            cwd: "bower_components",
            src: "*/**",
            dest: "source/js/vendors"
          }]
        }
      },
      less: {
        style: {
          files: {
            "build/css/style.css": "source/less/style.less"
          }
        }
      },
      postcss: {
        options: {
          processors: [
            require("autoprefixer")({browsers: "last 2 versions"})
          ]
        },
        style: {
          src: "build/css/*.css"
        }
      },
      imagemin: {
        images: {
          options: {
            optimizationLevel: 3
          },
          files: [{
            expant: true,
            src: ["build/img/**/*.{png,jpg,gif,svg}"],
          }]
        }
      },
      concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['source/js/vendors/moment/min/moment.min.js',
                'source/js/vendors/moment/min/locales.min.js',
                'source/js/vendors/mustache.js/mustache.min.js',
                'source/js/vendors/picturefill/dist/picturefill.min.js',
                'source/js/vendors/tap/dist/tap.min.js',
                'source/js/main.js'],
          dest: 'build/js/main.js',
        },
      },
      cmq: {
        style: {
          files: {
            "build/css/style.css": ["build/css/style.css"]
          }
        }
      },
      cssmin: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        target: {
          files: {
            'build/css/style.min.css': ['build/css/style.css']
          }
        }
      },
      uglify: {
        options: {
          mangle: false
        },
        my_target: {
          files: {
            'build/js/main.min.js': ['source/js/main.js']
          }
        }
      },
      htmlmin: {
        dist: {
          options: {
            removeComments: false,
            collapseWhitespace: true
          },
          files: {
            'build/index.html': 'source/index.html',
            'build/form.html': 'source/form.html',
            'build/blog.html': 'source/blog.html',
            'build/post.html': 'source/post.html'
          }
        },
      },
      watch: {
        style: {
          files: ["less/**/*.less"],
          tasks: ["less", "postcss"],
          options: {
            spawn: false,
            livereload: true
          }
        }
      }
  };
  


  // Не редактируйте эту строку
  config = require("./.gosha")(grunt, config);

  grunt.registerTask("build",[
    "clean",
    "copy",
    "less",
    "postcss",
    "imagemin",
    "concat",
    "cmq",
    "cssmin",
    "uglify",
    "htmlmin"
  ]);

  grunt.initConfig(config);
};
