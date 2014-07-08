module.exports = function(grunt) {

  grunt.initConfig({

    imagemin: {
                               // Task
      docImages: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'docs/',                  // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'docs/'                  // Destination path prefix
        }]
      },

      blogImages: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'blog/',                  // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'blog/'                  // Destination path prefix
        }]
      }

    },

    image_resize: {
      resize: {
        options: {
          width: 1024
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'docs/',                  // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'docs/'                  // Destination path prefix
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.registerTask('default', ['image_resize', 'imagemin']);

};
