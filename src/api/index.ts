import axios from './axios';
import { GifType } from './types';

// TODO: extract this as a env variable
const apiKey = 'BluxFAOfAHEf9xg0PdiHD1fqlEAEdlSu';

export const fetchRandomGif = () =>
  axios.get<GifType>('/v1/gifs/random', { params: { api_key: apiKey } });

export const searchGifs = (query: string) =>
  axios.get<GifType[]>('/v1/gifs/search', {
    params: { api_key: apiKey, q: query },
  });
