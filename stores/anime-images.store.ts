import { addHours, isFuture } from "date-fns";
import { defineStore } from "pinia";
import { getItemValue, setItemValue } from "~/lib/dbManager";
import type {
    NekoImage,
    PairRate,
    ServerResponse,
    StatusCode,
} from "~/server/types/index.types";

export const useAnimeImageStore = defineStore(
    "anime-images",
    () => {
        const images = ref<NekoImage[]>([]);
        const fetchImages = async () => {
            const response =
                await $fetch<ServerResponse<StatusCode, NekoImage[]>>('/api/anime/images');
            if (!response.ok) {
                throw new Error(response.error ?? response.message);
            }
            if (response.data) {
                // stores the image links in local storage
                setItemValue("neko-img", {
                    data: response.data,
                    timestamp: useNow().value,
                    expires: addHours(useNow().value, 6),
                });
                images.value = response.data;
            }
        };
        const fetchImagesFromStorage = async () => {
            const imagesFromStorage = getItemValue('neko-img') as {
                data: NekoImage[];
                timestamp: Date;
                expires: Date;
            } | null;
            if (imagesFromStorage) {
                if (isFuture(imagesFromStorage.expires)) {
                    images.value = imagesFromStorage.data;
                } else {
                    // If the images are expired, fetch new images
                   await fetchImages();
                }
            } else {
                // If there are no images in storage, fetch new images
              await  fetchImages();

            }
        };
      

        return { fetchImages, images, fetchImagesFromStorage };
    },
    // { persist:true}
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAnimeImageStore, import.meta.hot));
}
