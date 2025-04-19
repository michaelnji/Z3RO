<script lang="ts" setup>
import type {
    NekoImage,
    ServerResponse,
    StatusCode,
} from "~/server/types/index.types";
import { useAnimeImageStore } from "~/stores/anime-images.store";

const isLoading = ref(true);
const animeImageStore = useAnimeImageStore();
onMounted(async () => {
    try {
        await animeImageStore.fetchImagesFromStorage()
        isLoading.value = false;
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


                <NuxtImg v-if="!isLoading && animeImageStore.images" :src="animeImageStore.images[0].url" alt=""
                    class="rounded-xl object-contain mxa  wmax " :custom="true" v-slot="{ src, isLoaded, imgAttrs }">
                    <!-- Show the actual image when loaded -->
                    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" class="rounded-xl object-contain">

                    <!-- Show a placeholder while loading -->
                    <Skeleton v-if="!isLoaded" class=" h-12rem bg-red-200 rounded-2xl w-full" />
                </NuxtImg>

                <!-- <div v-if="!isLoading && animeImageStore.images" class="mt1">
                    <h2 class="text-base font-extrabold">{{ animeImageStore.images[0].artist_name }}</h2>
                </div> -->
            </div>
            <div
                class="p3 bg-green-300 rounded-2xl hover:scale-125 hover:rotate-8 hover:-skew-y-2 transition-all duration-150  z-1 !w-8rem">
                <Skeleton v-if="isLoading" class=" h-12rem bg-green-200 rounded-2xl !w-full" />


                <NuxtImg v-if="!isLoading && animeImageStore.images" :src="animeImageStore.images[1].url" alt=""
                    class="rounded-xl object-contain mxa  wmax " :custom="true" v-slot="{ src, isLoaded, imgAttrs }">

                    <!-- Show the actual image when loaded -->
                    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" class="rounded-xl object-contain">

                    <!-- Show a placeholder while loading -->
                    <Skeleton v-if="!isLoaded" class=" h-12rem bg-green-200 rounded-2xl w-full" />
                </NuxtImg>

                <!-- <div v-if="!isLoading && animeImageStore.images" class="mt1">
                    <h2 class="text-base font-extrabold">{{ animeImageStore.images[1].artist_name }}</h2>
                </div> -->
            </div>
            <div
                class="p3 bg-blue-300 rounded-2xl  hover:scale-125 hover:-rotate-8 hover:-skew-y-2 transition-all duration-150  rotate-8  z-0 hover:z-1 !w-8rem">
                <Skeleton v-if="isLoading" class=" h-12rem bg-blue-200 rounded-2xl !w-full" />



                <NuxtImg v-if="!isLoading && animeImageStore.images" :src="animeImageStore.images[2].url" alt=""
                    class="rounded-xl object-contain mxa  wmax " :custom="true" v-slot="{ src, isLoaded, imgAttrs }">

                    <!-- Show the actual image when loaded -->
                    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" class="rounded-xl object-contain">

                    <!-- Show a placeholder while loading -->
                    <Skeleton v-if="!isLoaded" class=" h-12rem bg-blue-200 rounded-2xl w-full" />
                </NuxtImg>


                <!-- <div v-if="!isLoading && animeImageStore.images" class="mt1">
                    <h2 class="text-base font-extrabold">{{ animeImageStore.images[2].artist_name }}</h2>
                </div> -->
            </div>


        </div>
        <h2 class="font-bold font-japanese text-4xl text-center ">Random Neko</h2>
    </div>
</template>
