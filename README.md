# React Static Renderer
A webpack plugin that lets you render a html file for each js-bundle you got

This package is heavily inspired by Ian Sinnot's talk ["Building Static Sites with React"](https://www.youtube.com/watch?v=CPpM5-rXrZ4).
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
        stylesheet: 'default.css',
      },
    }),
  ],

};
```

```js
// src/todo.js
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.js';

// Don't try to render unless we're in the browser
if (typeof document !== 'undefined')
  render(<App />, document.getElementById('root'));

// Be sure to export the React component so that it can be statically rendered
export default App;
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

## License

MIT © [Thor Even Tutturen](http://tutturen.technology)
