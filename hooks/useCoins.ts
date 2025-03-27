import { coinsRepository } from "@/services/coinsRepository";
import { useQuery } from "@tanstack/react-query";

export const useRates = (base: string) => {
    return useQuery({
        queryKey: ["rates", base],
        queryFn: ()  => coinsRepository.getAllRates(base),
        staleTime: 1000 * 5 * 60,
    })
}

export const useAllCoinsCode = ()  => {
    return useQuery({
        queryKey: ["coins"],
        queryFn: coinsRepository.getAllCodes,
        staleTime: Infinity,
    })
}

export const useAllCoinsName = ()  => {
    return useQuery({
        queryKey: ["coins"],
        queryFn: coinsRepository.getAllCodes,
        staleTime: Infinity,
    })
}
