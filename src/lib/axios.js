import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://159.223.59.203:2000/transaksis"
})

//http://159.223.59.203:2000/transaksis
//http://localhost:2000/transaksis

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("nih token"+token);
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );