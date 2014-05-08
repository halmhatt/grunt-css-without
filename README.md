# grunt-css-without

> Remove CSS properties from files

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-without --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-without');
```

## The "css_without" task

### Overview
In your project's Gruntfile, add a section named `css_without` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_without: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.declarations
Type: `Object`
Default value: `{}`

An object describing all the properties *(and optionally values) that you want to remove from the CSS-files.

Use *camel case* or *wrap properties with `"`*

```js
{
  // Remove all flex-direction declarations
  flexDirection: null,

  "border-radius": null
}
```

Specify a value if you only want that value removed, *value must match exactly*. 

```js
{
  // Remove all display: flex; declarations
  display: "flex"
}
```

You may also specify multiple values

```js
{
  display: ["flex", "inline-flex"]
}
```

#### options.separator
Type: `String`
Default value: `'\n'`

A string value separating the files when concatinating. This will nog be seen in the output.

### Usage Examples

#### Default Options
With the default options, the files will just be contatinated, and formated. 

```js
grunt.initConfig({
  css_without: {
    options: {},
    files: {
      'dest/styles.css': ['css/main.css', 'css/list.css']
    }
  }
});
```

#### Custom Options
With these options the files will be concatinated and all *flex* declarations will be removed. For example if you want to test in brower without flex.

```js
grunt.initConfig({
  css_without: {
    options: {
      declarations: [
        display: ['flex', 'inline-flex'],
        flex: null,
        flexDirection: null,
        flexWrap: null,
        flexFlow: null,
        justifyContent: null,
        alignItems: null,
        alignContent: null,
        order: null,
        flexGrow: null,
        flexShrink: null,
        flexBasis: null,
        alignSelf: null
      ]
    },
    files: {
      'dest/styles.css': ['css/main.css', 'css/list.css']
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-05-08...v0.1.0...First release
