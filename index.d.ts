import { JawgPlaces } from '@jawg/types';

interface Options {
  accessToken: string;
}

export default class JawgJSLoader {
  constructor(options: Options);
  loadJawgPlaces(version?: string): Promise<typeof JawgPlaces>;
}
