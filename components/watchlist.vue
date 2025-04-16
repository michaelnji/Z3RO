<script lang="ts" setup>
import type { PairRate, StatusCode, ServerResponse } from '~/server/types/index.types'

const instruments = [
    {
        name: 'USD/JPY',
        icon: 'flag:us-1x1'
    },
    {
        name: 'BTC/USD',
        icon: 'cryptocurrency-color:btc'
    },
    {
        name: 'EUR/USD',
        icon: 'flag:eu-1x1'

    },
    {
        name: 'GBP/JPY',

        icon: 'flag:gb-1x1'

    }
]
const isLoading = ref(true)
const priceData = ref<{ pair: string, rate: number }[]>([])
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
        const resp = await $fetch<ServerResponse<StatusCode, PairRate[]>>('/api/finance/rates', {
            method: 'POST',
            body: reqBody
        })
        if (resp.ok && resp.data) {
            isLoading.value = false
            priceData.value = resp.data
        }

    } catch (error) {
        console.log(error)

    }
}) 
</script>
<template>
    <div>
        <div class="rounded-3xl bg-white p6">
            <h2 class="font-medium text-2xl">Instrument Watchlist</h2>
            <div class="mt3 grid grid-cols-2 gap-3">
                <div class="rounded-2xl p3 bg-stone-100" v-if="!isLoading" v-for="item, k in instruments">
                    <div class="flex items-center gap-x-3">
                        <div class=" rounded-full grid place-items-center overflow-hidden">
                            <Icon :name="item.icon" size="30" />
                        </div>
                        <p class="text-lg">{{ item.name }}</p>
                    </div>
                    <h2 class="font-extrabold font-mono mt2 text-3xl">${{
                        Intl.NumberFormat('us').format(priceData[k].rate).toString() }}
                    </h2>
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
                    <Skeleton class="rounded-2xl wfull bg-stone-200 !h6.1rem" />
                </div>

            </div>
        </div>
    </div>

</template>
