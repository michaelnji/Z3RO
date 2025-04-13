<script lang="ts" setup>
const instruments = [
    {
        name:'DXY',
        price:102.3,
        change: 1.09,
        icon: 'flag:us-1x1'
    },
    {
        name:'BTC/USD',
        price:85049,
        change: 3.9,
        icon:'cryptocurrency-color:btc'
    },
    {
        name:'EUR/USD',
        price:0.9938,
        change: -3.22,
        icon: 'flag:eu-1x1'

    },
    {
        name:'GBP/JPY',
        price:1.19210,
        change: -0.22,
        icon: 'flag:gb-1x1'

    },
    {
        name:'NZD/USD',
        price:15.010,
        change: 0.89,
        icon: 'flag:nz-1x1'

    },
    {
        name:'CHF/CAD',
        price: 0.69,
        change: 0,
        icon: 'flag:ch-1x1'

    },
]
// 
</script>
<template>
    <div>
        <div class="rounded-3xl bg-white p6">
            <h2 class="font-medium text-2xl">Instrument Watchlist</h2>
            <div class="mt3 grid grid-cols-2 gap-3">
                <div class="rounded-2xl p3 bg-stone-100" v-for="item in instruments">
                    <div class="flex items-center gap-x-3">
                        <div class=" rounded-full grid place-items-center overflow-hidden">
                            <Icon :name="item.icon" size="30" />
                        </div>
                        <p class="text-lg">{{ item.name }}</p>
                    </div>
                    <h2 class="font-extrabold font-mono mt2 text-3xl">${{ Intl.NumberFormat('us').format(item.price).toString() }}
                    </h2>
                    <div class="flex items-end gap-x-1">
                        <Icon name="solar:alt-arrow-down-bold"  class="text-red-400" v-if="item.change < 0" size="26" />
                        <Icon name="solar:alt-arrow-up-bold"  class="text-green-400" v-if="item.change > 0" size="26" />
                        <p class="text-lg mt2 font-bold"
                            :class="{ '!text-green-500': item.change > 0, '!text-red-500': item.change < 0 }">{{
                            item.change
                            }}%</p>

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>
