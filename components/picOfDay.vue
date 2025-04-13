<script lang="ts" setup>
const img1 = "https://s3.nyeki.dev/nekos-api/images/original/81af12cc-7cb1-43fe-965d-1c4a6c581c1e.webp"
const img2 = 'https://s3.nyeki.dev/nekos-api/images/original/81af12cc-7cb1-43fe-965d-1c4a6c581c1e.webp'
const img3 = 'https://s3.nyeki.dev/nekos-api/images/original/ce757f05-0af1-491c-8654-1ee144c4ce1d.webp'
</script>
<template>
    <div>
        <div class="p6 flex">
            <div class="p3 bg-red-300 rounded-2xl  -rotate-8 -z-1 w-max">
                <img :src="img1" alt="" class="rounded-xl object-contain ">
                <div class="mt2">
                    <h2 class="text-base font-extrabold">#1299</h2>
                </div>
            </div>
            <div class="p3 bg-amber-300 rounded-2xl w-max">
                <img :src="img2" alt="" class="rounded-xl object-contain ">
                <div class="mt2">
                    <h2 class="text-base z-1 font-extrabold">#1012</h2>
                </div>
            </div>
            <div class="p3 bg-green-200 rounded-2xl rotate-8 -z-1 w-max">
                <img :src="img3" alt="" class="rounded-xl object-contain ">
                <div class="mt2">
                    <h2 class="text-base font-extrabold">#8143</h2>
                </div>
            </div>

        </div>
        <h2 class="font-bold font-action text-5xl text-center ">Neko of the day!</h2>
    </div>
</template>
