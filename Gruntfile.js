/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        criticalcss: {
            custom: {
                options: {
                    url: "http://localhost:4000",
                    width: 320,
                    height: 480,
                    outputfile: "_site/styles/critical.css",
                    filename: "_site/styles/screen.css"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-criticalcss');

    grunt.registerTask('default', ['criticalcss']);
};
