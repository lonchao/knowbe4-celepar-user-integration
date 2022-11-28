import axios from "axios";

const api = axios.create({
  baseURL: process.env.KNOWBE4_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.KNOWBE4_TOKEN}`,
  },
});

export default api;
