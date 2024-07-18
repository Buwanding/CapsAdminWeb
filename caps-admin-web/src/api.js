// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.7:8000",
});

export default instance;