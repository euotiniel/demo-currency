import { api } from "@/lib/axios";

export const coinsRepository = {

    async getAllCodes () {
        const { data } = await api.get(`codes`);
        return data.supported_codes.map(([cod]: [string, string]) => [cod]);
    },
    
    async getAllNames () {
        const { data } = await api.get(`codes`);
        return data.supported_codes.map(([_, coinName]: [string, string]) => [coinName]);
    },

    async getAllRates (code: string) {
        const { data } = await api.get(`latest/${code}`);
        return data;
    }

}