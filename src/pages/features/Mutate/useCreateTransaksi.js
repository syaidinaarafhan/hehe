import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {

      try {
        const transaksiResponse = await axiosInstance.post("/insertCard", body);
      return transaksiResponse;
      } catch (error) {
        console.log("nih errornya "+error)
      }
      
    },
    onSuccess,
  });
};