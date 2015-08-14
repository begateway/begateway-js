module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> by eComCharge <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'src/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      dist: {
        src: ['src/jquery-2.1.4.min.js', 'src/jquery-ui.min.js', 'src/paymentr.min.js'],
        dest: 'paymentr.min.js',
      },
    },
    clean: ['src/paymentr.min.js']
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['uglify', 'concat', 'clean']);
};
