<script lang="ts" setup>

</script>
<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class=" font-fifa clock font-bold leading-none  tracking-wide text-9xl">15:49</h1>

        <div class="flex mt2 items-center justify-between gap-x-6">
            <div class="flex items-center gap-1">
                <Icon name="solar:calendar-outline" size="24" />
                <h3 class=" text-lg">20th June 2025</h3>
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
