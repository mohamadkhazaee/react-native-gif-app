import axios from './axios';
import { RandomGif } from './types';

// TODO: extract this as a env variable
const apiKey = 'BluxFAOfAHEf9xg0PdiHD1fqlEAEdlSu';

export const fetchRandomGif = () =>
  axios.get<RandomGif>('/v1/gifs/random', { params: { api_key: apiKey } });
