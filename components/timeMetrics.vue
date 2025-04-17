<script lang="ts" setup>
import { usePermission } from '@vueuse/core';
import { format, secondsToHours } from 'date-fns';
import timezones from 'timezones-list';
import type { DayInfo, ServerResponse, StatusCode } from '~/server/types/index.types';
const isLoading = ref(true)
const currentTz = timezones.find((x) => x.utc === format(useNow().value, 'xxx'))?.tzCode
const data = ref<DayInfo | null>(null)
onMounted(async () => {
    try {

        const geolocationAccess = usePermission('geolocation')
        console.log(geolocationAccess)
        const { coords } = useGeolocation()

        const reqBody: {
            lat: number,
            lng: number,
            date: string,
            tzid: string,
            formatted: 0 | 1
        } = {
            lat: Number(coords.value.latitude),
            lng: Number(coords.value.longitude),
            date: 'today',
            formatted: 0,
            tzid: currentTz ?? 'UTC'
        }
        // console.log(coords.value)
        if (Number.isFinite(coords.value.latitude) && Number.isFinite(coords.value.longitude)) {
            const response = await $fetch<ServerResponse<StatusCode, DayInfo>>('/api/weather/sunset', {
                body: reqBody,
                method: "POST"
            })
            if (response.ok && response.data) {
                isLoading.value = false
                data.value = response.data
                console.log(data)
            }
        }


    } catch (error) {
        console.log(error)
    }
})
</script>
<template>
    <div>
        <div class="rounded-3xl bg-white p6">
            <h3 class="uppercase opacity-80 text-base mb2">Time Metrics</h3>
            <Skeleton v-if="isLoading" class="w-full h-2.2rem bg-stone-200 rounded-xl" />
            <Skeleton v-if="isLoading" class="w-full h-2.2rem mt2 bg-stone-200 rounded-xl" />
            <h2 v-if="!isLoading && data" class="text-3xl font-bold">
                Day will last for <b class="underline underline-dashed  font-action text-amber-600">{{
                    secondsToHours(data.results.day_length) }} hours</b>

                with
                sunrise at <b class="underline underline-dashed  font-action text-violet-600">{{
                    format(data.results.sunrise, 'hh:mm') }}</b> & sunset at
                <b class="underline underline-dashed  font-action text-green-600">{{
                    format(data.results.sunset, 'hh:mmaaa') }}</b>
            </h2>
        </div>
    </div>
</template>


