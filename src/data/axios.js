import axios from "axios";

const instance = axios.create({
  baseURL: "https://huzend-server.onrender.com",
});

export default instance;
