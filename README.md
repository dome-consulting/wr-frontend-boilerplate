# React Redux Frontend Boilerplate

Base template for WR frontend projects built with React and Redux.

This template is a starting point for building a frontend using React and Redux.
Provides the project's folder structure, main dependencies and commonly used configurations.

To start a new project, copy this template and replace the example code.

## Quick Start

```
git clone https://github.com/dome-consulting/wr-frontend-boilerplate.git
cd wr-frontend-boilerplate/
npm install
npm start
open http://localhost:8000
```

## Folder structure

* `conf` Contains per environment configuration
* `dist` Publish directory
* `src` Intended for source code and unit tests
  * `actions` Redux actions and Redux Thunk functions
  * `components` React-redux components grouped by feature
  * `i18n` Provides internationalization
  * `reducers` Provides the root reducer
  * `routes` Provides the Redux router and routes definitions
  * `store` Provides the Redux store with Thunk middleware
* `test` Intended for integration tests and unit tests helpers

## Available scripts

* `npm start` Starts WebpackDevServer in watch mode with `local` configuration
* `npm test` Runs all tests in `src/**/*.spec.js`
* `npm run build-local` Builds the frontent for local development
* `npm run build-dev` Builds the frontent for the development environment
* `npm run build-pre` Builds the frontent for the pre-production environment
* `npm run build-production` Builds the frontent for the production environment

## Supported features

This project template supports:

* [ES6](https://github.com/lukehoban/es6features) syntax
* [ES6 polyfills](https://babeljs.io/docs/usage/polyfill/)
* [Stage 1 preset](https://babeljs.io/docs/plugins/preset-stage-1/)  features
* [JSX](https://facebook.github.io/react/docs/hello-world.html) syntax
* [SASS](http://sass-lang.com/) Preprocessor

## Main dependencies provided

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Redux Thunk](https://github.com/gaearon/redux-thunk)
* [Redux Form](http://redux-form.com)
* [React Flexboxgrid](https://roylee0704.github.io/react-flexbox-grid/)
* [Material UI](http://www.material-ui.com)
* [Webpack 2](https://webpack.github.io/) (build)
* [Mocha](https://mochajs.org/), [Chai](chaijs.com/) and [Enzyme](http://airbnb.io/enzyme/) (tests)
