const CALLBACK_CACHE = {};

const createUrl = ({ lib, version = 'latest', accessToken }) => {
  let url = `https://api.jawg.io/libraries/`;
  switch (lib) {
    case 'JawgPlaces':
      url += `jawg-places@${version}/jawg-places.js`;
      break;
    default:
      throw new Error(`Library ${lib} not found`);
  }
  return `${url}?access-token=${accessToken}`;
};

const load = ({ lib, version, accessToken } = {}) => {
  if (window[lib] !== undefined) {
    return new Promise.resolve(window[lib]);
  } else if (CALLBACK_CACHE[lib] !== undefined) {
    return new Promise((resolve, reject) => {
      CALLBACK_CACHE[lib].push({ resolve, reject });
    });
  } else if (CALLBACK_CACHE[lib] === undefined) {
    CALLBACK_CACHE[lib] = [];
  }
  return new Promise((resolve, reject) => {
    CALLBACK_CACHE[lib].push({ resolve, reject });
    const url = createUrl({ lib, version, accessToken });
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onerror = (error) => {
      CALLBACK_CACHE[lib].forEach(({ reject }) => reject(error));
    };
    script.defer = true;
    script.async = true;
    script.onload = () => {
      CALLBACK_CACHE[lib].forEach(({ resolve }) => {
        resolve(window.JawgPlaces);
      });
    };

    document.head.appendChild(script);
  });
};

export default class JawgJSLoader {
  constructor({ accessToken }) {
    this.accessToken = accessToken;

    if (JawgJSLoader.instance) {
      if (accessToken !== JawgJSLoader.instance.accessToken) {
        throw new Error('Loader must not be called twice with different access tokens');
      }
      return JawgJSLoader.instance;
    }
    JawgJSLoader.instance = this;
  }

  loadJawgPlaces(version = 'latest') {
    return load({ lib: 'JawgPlaces', version, accessToken: this.accessToken });
  }
}
