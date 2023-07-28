import axios from './axios';
import { GifType } from './types';
import { API_KEY } from '@env';

export const fetchRandomGif = () =>
  axios.get<GifType>('/v1/gifs/random', { params: { api_key: API_KEY } });

export const searchGifs = (query: string) =>
  axios.get<GifType[]>('/v1/gifs/search', {
    params: { api_key: API_KEY, q: query },
  });
