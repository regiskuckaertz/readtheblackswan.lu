/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    less: {
      main: {
        options: {
          ieCompat: false,
          strictMath: true
        },
        files: [{
          expand: true,
          cwd: 'styles/',
          src: '*.less',
          dest: 'styles/',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      files: {
        src: "styles/screen.css",
        dest: "styles/screen.css"
      }
    },
    cssc: {
      main: {
        options: {
            sort: true,
            lineBreaks: true,
            compress: true
        },
        files: {
          "_includes/styles.html": "styles/screen.css"
        }
      }
    },
    uglify: {
      main: {
        files: [{
            expand: true,
            cwd: 'scripts/',
            src: ['*.js','!*.min.js'],
            dest: '_includes/',
            ext: '.html'
        }]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-cssc');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['less', 'autoprefixer', 'cssc', 'uglify']);

};
