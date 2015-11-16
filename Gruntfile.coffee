module.exports = (grunt) ->

  grunt.initConfig
    qunit:
      options:
        coverage:
          src: 'dataguise.js'
          instrumentedFiles: "temp/"
          htmlReport: "build/report/coverage"
          lcovReport: "build/report/lcov"
          linesThresholdPct: 0
      files: ['test/index.html']
    coveralls:
      options:
        force: true
      main_target:
        src: "build/report/lcov/lcov.info"

  grunt.loadNpmTasks 'grunt-coveralls'
  grunt.loadNpmTasks 'grunt-qunit-istanbul'

  grunt.registerTask 'test', ['qunit']
  grunt.registerTask 'coverage', ['qunit', 'coveralls']

  return
