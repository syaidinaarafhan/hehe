import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchProducts = ({ onError }) => {
  return useQuery({
    queryFn: async () => {
      const transaksiResponse = await axiosInstance.get("/settlement");

      return transaksiResponse;
    },
    queryKey: ["fetch.products"],
    onError,
  });
};