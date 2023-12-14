import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useOfflineTransaksi = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {

      try {
        const transaksiResponse = await axiosInstance.post("/offline", body);
      return transaksiResponse;
      } catch (error) {
        console.log("nih errornya "+error)
      }
      
    },
    onSuccess,
  });
};