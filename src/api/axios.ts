import axios from 'axios';
import { BASE_URL } from '@env';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [(response) => JSON.parse(response).data],
});
