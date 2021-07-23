# js-loader

[![npm](https://img.shields.io/npm/v/@jawg/js-loader)](https://www.npmjs.com/package/@jawg/js-loader)

Load the Jawg Maps JavaScript libraries dynamically.

## Install

Available via npm as the package [@jawg/js-loader](https://www.npmjs.com/package/@jawg/js-loader).

```sh
npm i @jawg/js-loader
```

or

```sh
yarn add @jawg/js-loader
```

Alternatively you may add the umd package directly to the html document using the unpkg link.

```html
<script src="https://unpkg.com/@jawg/js-loader@1.0.0/dist/jawg-js-loader.js"></script>
```

When adding via unpkg, the loader can be accessed at `JawgJSLoader`.

## Load Jawg Places JS

```javascript
import JawgJSLoader from '@jawg/js-loader';

let loader = new JawgJSLoader({ accessToken: '<YOUR_ACCESS_TOKEN>' });

loader.loadJawgPlaces().then((JawgPlaces) => {
  let jawgPlaces = new JawgPlaces.Input({ input: '#my-input' });
});
```

## Feedback

Please submint an [issue](https://github.com/jawg/js-loader/issues) for new features or when something is not working properly.