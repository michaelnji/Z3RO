<script lang="ts" setup>
import type { PairRate, StatusCode, ServerResponse } from '~/server/types/index.types'

const instruments = [
    {
        name: 'USD/JPY',
        icon: 'flag:us-1x1'
    },
    {
        name: 'EUR/USD',
        icon: 'flag:eu-1x1'

    },
    {
        name: 'BTC/USD',
        icon: 'cryptocurrency-color:btc'
    },
    {
        name: 'ETH/USD',
        icon: 'cryptocurrency-color:eth'
    },
    {
        name: 'GBP/JPY',

        icon: 'flag:gb-1x1'

    },
    {
        name: 'AUD/USD',
        icon: 'flag:au-1x1'
    },


]
const ratesStore = useRatesStore()

const isLoading = ref(true)
onMounted(async () => {
    try {
        const reqBody = []
        for (const item of instruments) {
            reqBody.push({
                pair: item.name,
                base: item.name.split('/')[0],
                quote: item.name.split('/')[1]
            });
        }
        await ratesStore.fetchRatesFromStorage(reqBody)
        isLoading.value = false;

    } catch (error) {
        console.log(error)

    }
}) 
const refreshContent = async () => {
    isLoading.value = true
    try {
        const reqBody = []
        for (const item of instruments) {
            reqBody.push({
                pair: item.name,
                base: item.name.split('/')[0],
                quote: item.name.split('/')[1]
            });
        }
        await ratesStore.fetchRates(reqBody)
        isLoading.value = false;

    } catch (error) {
        console.log(error)

    }
}
</script>
<template>
    <div>
        <div class="rounded-3xl bg-white p6">
            <div class="flex mb5 justify-between items-center gap-x-3">
                <h2 class="font-medium text-2xl">Instrument Watchlist</h2>
                <Button @click="refreshContent" class="opacity-60 hover:!opacity-100">
                    <Icon name="solar:refresh-linear" :class="{ 'animate-spin': isLoading }" size="26" />
                </Button>
            </div>
            <div class="mt3 grid grid-cols-2 gap-3">
                <div class="rounded-2xl p3 bg-stone-100" v-if="!isLoading && ratesStore.rates.length >= 1"
                    v-for="item, k in instruments">
                    <h2 class="font-extrabold  mb1 text-2xl">${{
                        Intl.NumberFormat('us').format(ratesStore.rates[k].rate).toString() }}
                    </h2>
                    <div class="flex items-center gap-x-2">
                        <div class=" rounded-full grid place-items-center overflow-hidden">
                            <Icon :name="item.icon" size="26" />
                        </div>
                        <p class="text-base">{{ item.name }}</p>
                    </div>
                    <!-- <div class="flex items-end gap-x-1">
                        <Icon name="solar:alt-arrow-down-bold"  class="text-red-400" v-if="item.change < 0" size="26" />
                        <Icon name="solar:alt-arrow-up-bold"  class="text-green-400" v-if="item.change > 0" size="26" />
                        <p class="text-lg mt2 font-bold"
                            :class="{ '!text-green-500': item.change > 0, '!text-red-500': item.change < 0 }">{{
                            item.change
                            }}%</p>

                    </div> -->

                </div>

                <div v-if="isLoading" v-for="i in instruments" class="">
                    <Skeleton class="rounded-2xl wfull bg-stone-200 !h5.4rem" />
                </div>

            </div>
        </div>
    </div>

</template>
