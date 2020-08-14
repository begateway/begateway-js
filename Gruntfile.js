module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.description %> \n * <%= pkg.name %> by eComCharge <%= grunt.template.today("yyyy-mm-dd")%>. Version <%= pkg.version %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'src/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      dist: {
        src: ['src/sentry-5.17.0.min.js', 'src/jquery-2.1.4.min.js', 'src/jquery-ui.min.js', 'src/begateway.min.js'],
        dest: 'begateway-<%= pkg.version %>.min.js',
      },
    },
    clean: ['src/begateway-<%= pkg.version %>.min.js']
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['uglify', 'concat', 'clean']);
};
