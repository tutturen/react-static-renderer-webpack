# React Static Renderer
A webpack plugin that lets you render a html file for each js-bundle you got

This package is heavily inspired by Ian Sinnott's talk ["Building Static Sites with React"](https://www.youtube.com/watch?v=CPpM5-rXrZ4).
He has also made a [very useful webpack-plugin](https://github.com/iansinnott/react-static-webpack-plugin/) for building static sites with React Router.
This package is not coupled with React Router, and instead seeks to build independent html files for every js-bundle you have.

## Installation

```
$ npm install --save-dev react-static-renderer-webpack
```

## Usage

### Basic Example

```js
// webpack.config.js
const ReactStaticRenderer = require('react-static-renderer-webpack');
const template = require('./template.js');

module.exports = {

  entry: {
    todo: './src/todo.js',
    login: './src/login.js',
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',                
    libraryTarget: 'umd', // This is a requirement
    publicPath: '/',
  },

  plugins: [
    new ReactStaticRenderer({
      sources: [
        { bundle: 'todo.js', title: 'Todo App' },
        { bundle: 'login.js', title: 'Login Page' },
      ],
      defaults: {
        staticMarkup: false, // Only use if you don't want React to hook
        favicon: '/favicon.png',
        title: 'Awesome App',
        render: template.render,
        stylesheet: '/default.css',
      },
    }),
  ],

};
```

```js
// src/todo.js
import React from 'react';
import { render } from 'react-dom';
import Todo from './components/Todo.js';

// Don't try to render unless we're in the browser
if (typeof document !== 'undefined') {
  render(<Todo />, document.getElementById('root'));
}
// Be sure to export the React component so that it can be statically rendered
export default Todo;
```

You will need to implement a render function for your template.
How you implement this is entirely up to you. You can implement with it React, if you want.
I show a simple implementation below using template literals.

```js
// template.js
export const render = ({ title, favicon, stylesheet, body, bundle }) => (`
  <!doctype html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="shortcut icon" type="image/png" href="${favicon}"/>
      <link rel="stylesheet" type="text/css" href="${stylesheet}" />
    </head>
    <body>
      <div id="root">${body}</div>
      <script type="text/javascript" src="/${bundle}"></script>
    </body>
  </html>
`);

```
Now when you run `webpack` you will see `todo.html` in the output. Serve it statically and open it in any browser.

## API

The ReactStaticRenderer takes two arguments - sources and defaults.
The sources represent each html-file you want to create from your bundles.
The defaults are the fallback values for when something is not specified in a source.

### bundle: string
The full name of the js-bundle specified in "entry" in the webpack config.

### title: string
The title for the html document

### favicon: string
The favicon for the html document

### stylesheet: string
The full path of the stylesheet

### render: function
A function which should accept an options argument.
The options argument should have the following properties: title, favicon, stylesheet, body, bundle
The body is the html for your react component, and the rest is described above.

### staticMarkup: boolean
This simply decides if we use "renderToString" or "renderToStaticMarkup" when rendering our react component.

## License

MIT © [Thor Even Tutturen](http://tutturen.technology)
