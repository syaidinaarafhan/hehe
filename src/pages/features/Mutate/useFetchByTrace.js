import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchProducts = ({ traceNumber, onError }) => {
  return useQuery({
    queryFn: async (body) => {
      const transaksiResponse = await axiosInstance.get(`/find/${body.traceNumber}`);
      return transaksiResponse.data;
    },
    queryKey: ["fetch.products", traceNumber],
    onError,
  });
};
