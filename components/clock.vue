<script lang="ts" setup>
import { format } from "date-fns";
const now = useNow()
const formatStr = 'hh:mm'
const formatStrDate = 'do MMMM y'
const formattedTime = computed(() => {
    return format(now.value, formatStr)
})
const formattedDate = computed(() => {
    return format(now.value, formatStrDate)
})


</script>
<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class=" font-panton clock font-bold leading-none  tracking-wide text-9xl">{{ formattedTime }}</h1>

        <div class="flex mt2 items-center justify-between gap-x-6">
            <div class="flex items-center gap-1">
                <Icon name="solar:calendar-outline" size="24" />
                <h3 class=" text-lg">{{ formattedDate }}</h3>
            </div>
            <div class="flex items-center gap-1">
                <Icon name="solar:cloud-bold-duotone" size="24" />
                <h3 class=" text-lg">20 C, Thunderstorms</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1.clock {
    color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 0px -3px 0 #000000,
        0px -3px 0 #000000,
        0px 3px 0 #000000,
        0px 3px 0 #000000,
        -3px 0px 0 #000000,
        3px 0px 0 #000000,
        -3px 0px 0 #000000,
        3px 0px 0 #000000,
        -3px -3px 0 #000000,
        3px -3px 0 #000000,
        -3px 3px 0 #000000,
        3px 3px 0 #000000,
        -3px 15px 0 #000000,
        0px 15px 0 #000000,
        3px 15px 0 #000000;
}
</style>
