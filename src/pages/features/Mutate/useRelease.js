import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useRelease = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {

      try {
        const transaksiResponse = await axiosInstance.post("/release", body);
      return transaksiResponse;
      } catch (error) {
        console.log("nih errornya "+error)
      }
      
    },
    onSuccess,
  });
};