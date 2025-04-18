<script lang="ts" setup>
import { getHours } from "date-fns";
const now = useNow()
const currentHour = getHours(now.value)
const currentTab = ref<string>('overview')
const formattedGreeting = computed(() => {
    if (currentHour < 13 && currentHour >= 0) return 'Good morning, Michael'
    if (currentHour < 17 && currentHour >= 13) return 'Good day, Michael'
    if (currentHour < 19 && currentHour >= 17) return 'Good evening, Michael'
    return 'Good night, Michael'
})
</script>
<template>
    <div class="max-w-screen px6">
        <div>
            <!-- clock -->
            <div class="pt10 mxa  flex justify-center items-center">
                <Clock />
            </div>
            <div class=" mxa p6 flex justify-center items-center">
                <h1 class=" leading-none font-medium tracking-wide text-3xl">{{ formattedGreeting }}</h1>
            </div>
            <div class="my4 max-w-6xl mxa">
                <TabManager :tab="currentTab" @tab-change="(e) => currentTab = e" />
            </div>
        </div>
        <div class="hfull  p6 overflow-x-hidden wfull rounded-t-3xl glass-no-shadow  mxa">
            <OverviewTab v-if="currentTab === 'overview'" />
        </div>
    </div>
</template>


<style>

</style>