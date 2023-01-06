import axios from "axios";

const instance = axios.create({
  // baseURL: "https://huzend-server.onrender.com",
  baseURL: "http://localhost:5050",
});

export default instance;
