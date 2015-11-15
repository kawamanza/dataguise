module.exports = (grunt) ->

  grunt.initConfig
    qunit:
      files: ['test/index.html']

  grunt.loadNpmTasks 'grunt-contrib-qunit'

  grunt.registerTask 'test', 'qunit'

  return
