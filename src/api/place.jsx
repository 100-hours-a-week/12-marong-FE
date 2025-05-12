import axios from 'axios';

const placeInstance = axios.create({
  baseURL: import.meta.env.VITE_PLACE_BASE_URL,
});

export default placeInstance;