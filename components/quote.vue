<script lang="ts" setup>
import type { StatusCode, ServerResponse, Quote } from '~/server/types/index.types'

const isLoading = ref(true)
const quote = ref<string | null>(null)
onMounted(async () => {
    try {
        const resp = await $fetch<ServerResponse<StatusCode, Quote>>('/api/quotes')
        if (resp.ok && resp.data) {
            quote.value = resp.data.quote
            isLoading.value = false
        }

    } catch (error) {
        console.log(error)

    }
})

</script>
<template>
    <div>
        <div class="rounded-3xl h12rem bg-white p6">
            <h3 class="uppercase opacity-80 text-lg mb2">Quote of the day</h3>
            <Skeleton v-if="isLoading" class="w-full h-2rem bg-stone-200 rounded-xl" />
            <Skeleton v-if="isLoading" class="w-full h-2rem mt2 bg-stone-200 rounded-xl" />
            <Skeleton v-if="isLoading" class="w-full h-2rem mt2 bg-stone-200 rounded-xl" />
            <h2 class="text-3xl font-bold" v-if="!isLoading">
                {{ quote }}
            </h2>
        </div>
    </div>
</template>

