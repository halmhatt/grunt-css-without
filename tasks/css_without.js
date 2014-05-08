/*
 * grunt-css-without
 * https://github.com/halmhatt/grunt-css-without
 *
 * Copyright (c) 2014 Jacob Carlsson
 * Licensed under the MIT license.
 */

'use strict';

var parse = require('css-parse'),
    stringify = require('css-stringify');

function camelToDash(camelCase) {
  return camelCase.replace(/([A-Z])/g, function($1) {
    return '-' + $1.toLowerCase();
  });
}

function declarationMatch(sourceDeclaration, specifiedDeclaration) {
  if(sourceDeclaration.property === specifiedDeclaration.property) {

    // If value is null/undefined/false, all values matches
    if(!specifiedDeclaration.value) {
      return true;
    }

    // If value is specified, this should be used
    if(sourceDeclaration.value === specifiedDeclaration.value) {
      return true;
    }

    // Check if value is an array
    if(Object.prototype.toString.call(specifiedDeclaration.value) === '[object Array]') {

      // Check if value is in array
      return specifiedDeclaration.property.indexOf(sourceDeclaration.value) === -1;
    }
  }

  return false;
}

function filterDeclarations(declarations, properties) {
  // Filter declarations
  return declarations.filter(function(declaration) {
    var prop, val, 
        dec = {};

    // Loop over properties
    for(prop in properties) {
      if(properties.hasOwnProperty(prop)) {
        dec.value = properties[prop];
        dec.property = camelToDash(prop);

        // Check if property matches
        if(declarationMatch(declaration, dec)){
          // Remove element
          return false;
        }
      }
    }

    return true;
  });
}

function removeProperties(css, properties) {
  var parsed = parse(css, {position: true}),
      rules;

  rules = parsed.stylesheet.rules;

  // Loop over rules
  rules = rules.map(function(rule) {
    // Filter out properties that should be removed
    rule.declarations = filterDeclarations(rule.declarations, properties);

    return rule;
  });

  parsed.stylesheet.rules = rules;

  return stringify(parsed);
}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('css_without', 'Remove CSS properties from files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      declarations: [],
      separator: "\n"
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Remove properties
      src = removeProperties(src, options.declarations);

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
