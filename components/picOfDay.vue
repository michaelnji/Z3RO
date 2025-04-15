<script lang="ts" setup>
import type {
    NekoImage,
    ServerResponse,
    StatusCode,
} from "~/server/types/index.types";

const isLoading = ref(true);
const data = ref<NekoImage[] | null>(null);
onMounted(async () => {
    try {
        const response = await $fetch<ServerResponse<StatusCode, NekoImage[]>>(
            "/api/anime/images",
            {
                method: "GET",
            },
        );
        if (response.ok && response.data) {
            isLoading.value = false;
            data.value = response.data;
            console.log(data.value);
        }
    } catch (error) {
        console.log(error);
    }
});
</script>
<template>
    <div>
        <div class="p3 flex justify-center">
            <div
                class="p3 bg-red-300 rounded-2xl  hover:!scale-125 hover:rotate-8 hover:skew-y-2 transition-all duration-150 -rotate-8 z-0 hover:!z-1 !w-8rem">
                <Skeleton v-if="isLoading" class=" h-12rem bg-red-200 rounded-2xl !w-full" />


                <NuxtImg v-if="!isLoading && data" :src="data[0].url" alt=""
                    class="rounded-xl object-contain mxa h-12rem wmax " width="100" height="150" :custom="true"
                    v-slot="{ src, isLoaded, imgAttrs }">
                    <!-- Show the actual image when loaded -->
                    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" class="rounded-xl object-contain">

                    <!-- Show a placeholder while loading -->
                    <Skeleton v-if="!isLoaded" class=" h-12rem bg-red-200 rounded-2xl w-full" />
                </NuxtImg>

                <!-- <div v-if="!isLoading && data" class="mt1">
                    <h2 class="text-base font-extrabold">{{ data[0].artist_name }}</h2>
                </div> -->
            </div>
            <div
                class="p3 bg-green-300 rounded-2xl hover:scale-125 hover:rotate-8 hover:-skew-y-2 transition-all duration-150  z-1 !w-8rem">
                <Skeleton v-if="isLoading" class=" h-12rem bg-green-200 rounded-2xl !w-full" />


                <NuxtImg v-if="!isLoading && data" :src="data[1].url" alt=""
                    class="rounded-xl object-contain mxa h-12rem wmax " width="100" height="150" :custom="true"
                    v-slot="{ src, isLoaded, imgAttrs }">

                    <!-- Show the actual image when loaded -->
                    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" class="rounded-xl object-contain">

                    <!-- Show a placeholder while loading -->
                    <Skeleton v-if="!isLoaded" class=" h-12rem bg-green-200 rounded-2xl w-full" />
                </NuxtImg>

                <!-- <div v-if="!isLoading && data" class="mt1">
                    <h2 class="text-base font-extrabold">{{ data[1].artist_name }}</h2>
                </div> -->
            </div>
            <div
                class="p3 bg-blue-300 rounded-2xl  hover:scale-125 hover:-rotate-8 hover:-skew-y-2 transition-all duration-150  rotate-8  z-0 hover:z-1 !w-8rem">
                <Skeleton v-if="isLoading" class=" h-12rem bg-blue-200 rounded-2xl !w-full" />


                <NuxtImg v-if="!isLoading && data" :src="data[2].url" alt=""
                    class="rounded-xl object-contain mxa h-12rem wmax " width="100" height="150" :custom="true"
                    v-slot="{ src, isLoaded, imgAttrs }">

                    <!-- Show the actual image when loaded -->
                    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" class="rounded-xl object-contain">

                    <!-- Show a placeholder while loading -->
                    <Skeleton v-if="!isLoaded" class=" h-12rem bg-blue-200 rounded-2xl w-full" />
                </NuxtImg>

                <!-- <div v-if="!isLoading && data" class="mt1">
                    <h2 class="text-base font-extrabold">{{ data[2].artist_name }}</h2>
                </div> -->
            </div>


        </div>
        <h2 class="font-bold font-japanese text-4xl text-center ">Random Neko</h2>
    </div>
</template>
