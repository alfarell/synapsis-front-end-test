import { BASE_URL } from '@/configs';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axios;
