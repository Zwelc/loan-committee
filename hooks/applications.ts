import { ILoanApplication } from "@/core/models/loans";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useLoans() {
  const { data, error, isLoading } = useSWR(`/api/loans`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
export function useLoan(id: string) {
  const { data, error, isLoading } = useSWR(`/api/loans/${id}`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
