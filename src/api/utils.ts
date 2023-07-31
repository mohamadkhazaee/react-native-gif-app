import axios from './axios';
import { SEARCH_API_LIMIT } from './constants';
import { FetchRandomGif, SearchGif } from './types';
import { API_KEY } from '@env';

export const fetchRandomGif = () =>
  axios
    .get<FetchRandomGif>('/v1/gifs/random', {
      params: { api_key: API_KEY },
    })
    .then((res) => res.data);

export const searchGifs = ({ query, offset }: SearchGif['params']) =>
  axios
    .get<SearchGif['response']>('/v1/gifs/search', {
      params: {
        api_key: API_KEY,
        q: query,
        offset: offset,
        limit: SEARCH_API_LIMIT,
      },
    })
    .then((res) => res.data);
