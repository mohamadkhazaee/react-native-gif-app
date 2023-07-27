import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.giphy.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [(response) => JSON.parse(response).data],
});
