'use strict';

var grunt = require('grunt');
var rewire = require('rewire');
var cssWithout = rewire('../tasks/css_without.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_without = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should not remove anything');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_options');
    var expected = grunt.file.read('test/expected/custom_options');

    test.equal(actual, expected, 'should remove defined properties');

    test.done();
  }
};

exports.testCamelToDashCaseConversion = function(test) {
  var camelToDash = cssWithout.__get__('camelToDash');

  test.expect(4);

  test.equal(camelToDash('flexDirection'), 'flex-direction');
  test.equal(camelToDash('flex-direction'), 'flex-direction');
  test.equal(camelToDash('border'), 'border');
  test.equal(camelToDash('pleaseUseDashCaseInstead'), 'please-use-dash-case-instead');

  test.done();
};

exports.testDeclarationMatch = function(test) {
  var declarationMatch = cssWithout.__get__('declarationMatch'),
      value;

  test.expect(4);

  value = declarationMatch({
    property: 'background',
    value: '#eee'
  }, {
    property: 'background',
    value: '#eee'
  });

  test.strictEqual(value, true, 'property should match');

  value = declarationMatch({
    property: 'background',
    value: '#eee'
  }, {
    property: 'background',
    value: null
  });

  test.strictEqual(value, true, 'property should match');

  value = declarationMatch({
    property: 'flex-direction',
    value: 'column'
  }, {
    property: 'flex-direction',
    value: null
  });

  test.strictEqual(value, true, 'property should match');

  value = declarationMatch({
    property: 'display',
    value: 'flex'
  }, {
    property: 'display',
    value: ['flex', 'inline-flex']
  });

  test.strictEqual(value, true, 'property should match');

  test.done();
};
