import JawgJSLoader from '../';
import L = require('leaflet');

new JawgJSLoader({ accessToken: 'test' }).loadJawgPlaces().then((JawgPlaces) => {
  new JawgPlaces.Input({ input: '#my-input' });
  new JawgPlaces.MapLibre({ searchOnTyping: true });
  new JawgPlaces.Mapbox({ searchOnTyping: true });
  new JawgPlaces.Leaflet({ searchOnTyping: true, L });
});
