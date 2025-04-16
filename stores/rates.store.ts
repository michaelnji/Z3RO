import { addHours, isFuture } from "date-fns";
import { defineStore } from "pinia";
import { getItemValue, setItemValue } from "~/lib/dbManager";
import type {
	PairRate,
	ServerResponse,
	StatusCode,
} from "~/server/types/index.types";

export const useRatesStore = defineStore(
	"rates",
	() => {
		const rates = ref<PairRate[]>([]);
		const fetchRates = async (body:{pair:string,base:string,quote:string}[]) => {
			const response =
				await $fetch<ServerResponse<StatusCode, PairRate[]>>('/api/finance/rates',{
                    method: "POST",
                    body: body,
                });
			if (!response.ok) {
				throw new Error(response.error ?? response.message);
			}
			if (response.data) {
                // stores the rates in local storage
				setItemValue("rates", {
					data: response.data,
					timestamp: useNow().value,
					expires: addHours(useNow().value, 1),
				});
                rates.value = response.data;
			}
		};
        const fetchRatesFromStorage = async (body:{pair:string,base:string,quote:string}[]) => {
            const ratesFromStorage = getItemValue('rates') as {
                data: PairRate[];
                timestamp: Date;
                expires: Date;
            } | null;
            if (ratesFromStorage) {
                if (isFuture(ratesFromStorage.expires)) {
                    rates.value = ratesFromStorage.data;
                } else {
                    // If the rates are expired, fetch new rates
                   await fetchRates(body);
                }
            } else {
                // If there are no rates in storage, fetch new rates
              await  fetchRates(body);

            }
        };
      

		return { fetchRates, rates, fetchRatesFromStorage };
	},
	// { persist:true}
);

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRatesStore, import.meta.hot));
}
