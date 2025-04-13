<script lang="ts" setup>
const currentTab = ref<string>('overview')
</script>
<template>
    <div class="max-w-screen hdvh px6 max-h-dvh">
        <div class="h-40% ">
            <!-- clock -->
            <div class="pt10 mxa  flex justify-center items-center">
                <Clock />
            </div>
            <div class=" mxa p6 flex justify-center items-center">
                <h1 class=" leading-none font-medium tracking-wide text-3xl">Good day, Michael</h1>
            </div>
            <div class="mt4 max-w-6xl mxa">
                <TabManager :tab="currentTab" @tab-change="(e) => currentTab = e" />
            </div>
        </div>
        <div class="  p6 overflow-x-hidden wfull rounded-t-3xl glass-no-shadow !h-60% mxa">
            <OverviewTab v-if="currentTab === 'overview'" />
        </div>
    </div>
</template>


<style>

</style>