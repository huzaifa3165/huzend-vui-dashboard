import axios from "axios";

const instance = axios.create({
  // baseURL: "https://huzend-server.onrender.com",
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5050"
      : "https://huzend-server.onrender.com/",
});

export default instance;
