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
    csso: {
      main: {
        files: {
          "styles/screen.min.css": "styles/screen.css",
          "_includes/critical.html": "styles/critical.css"
        }
      }
    },
    criticalcss: {
      custom: {
        options: {
          url: "http://readtheblackswan.dev",
          width: 320,
          height: 480,
          outputfile: "styles/critical.css",
          filename: "styles/screen.css"
        }
      }
    },
    uglify: {
      options: {
        compress: true,
        mangle: true,
        wrap: true
      },
      main: {
        files: {
          '_includes/scripts.html': ['scripts/ga.js', 'scripts/loadCSS.js', 'scripts/webfonts.js'] 
        }
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-csso');

  // Default task.
  grunt.registerTask('default', ['less', 'autoprefixer', 'criticalcss', 'csso', 'uglify']);

};
