<script lang="ts" setup>
import type { FoodInfo, ServerResponse, StatusCode } from '~/server/types/index.types';
const isLoading = ref(true)
const src = 'https://www.themealdb.com/images/media/meals/ysqupp1511640538.jpg'
const ing = ['lime', 'chicken', 'carrot', 'paprika']
const recipe = ref<FoodInfo['meals'][0]>()
const ingredients = computed(() => {
    if (!recipe.value) return []
    const ingredients: { name: string; measure: string }[] = []

    // Loop through all possible ingredient slots (1-20)
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe.value[`strIngredient${i}` as keyof typeof recipe.value] as string
        const measure = recipe.value[`strMeasure${i}` as keyof typeof recipe.value] as string

        // Only add if ingredient exists and isn't empty
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                name: ingredient.trim(),
                measure: measure?.trim() || ''
            })
        }
    }

    return ingredients
})
onMounted(async () => {
    try {
        const results = await $fetch<ServerResponse<StatusCode, FoodInfo>>('/api/food')
        console.log(results)
        if (results.ok && results.data) {
            isLoading.value = false
            recipe.value = results.data.meals[0]
        }
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <div>
        <div class="rounded-3xl bg-white p6">
            <div class="flex gap-x-3">
                <div class="w-2/5">
                    <NuxtImg v-if="!isLoading && recipe" :src="recipe.strMealThumb" alt=""
                        class="rounded-xl object-contain mxa h13rem wmax " :custom="true"
                        v-slot="{ src, isLoaded, imgAttrs }">
                        <!-- Show the actual image when loaded -->
                        <img v-if="isLoaded" v-bind="imgAttrs" :src="src" class="rounded-xl object-contain">

                        <!-- Show a placeholder while loading -->
                        <Skeleton v-if="!isLoaded" class=" h15rem bg-stone-200 rounded-2xl w-full" />
                    </NuxtImg>
                    <Skeleton v-if="isLoading" class=" h15rem bg-stone-200 rounded-2xl w-full" />
                </div>
                <div class="w-3/5">
                    <h3 v-if="!isLoading && recipe" class="font-bold text-3xl">
                        {{ recipe.strMeal }}
                    </h3>
                    <Skeleton v-if="isLoading" class=" h5rem bg-stone-200 rounded-2xl w-full" />
                    <div v-if="!isLoading && recipe" class="mt2 flex gap-2 flex-wrap">
                        <span
                            class="rounded-full bg-violet-500 text-sm px3 py.5 text-violet-600 bg-opacity-30 font-bold ">{{
                                recipe.strArea }}</span>
                        <span
                            class="rounded-full bg-amber-500 text-sm px3 py.5 text-amber-600 bg-opacity-30 font-bold ">{{
                                recipe.strCategory }}</span>
                    </div>
                    <div v-if="isLoading" class="mt2 flex gap-2 flex-wrap">
                        <Skeleton class=" h1.5rem bg-stone-200 rounded-2xl w6rem" />
                        <Skeleton class=" h1.5rem bg-stone-200 rounded-2xl w6rem" />
                    </div>
                    <h2 class=" text-lg mt4 mb2">Ingredients</h2>
                    <div class=" grid grid-cols-4 gap-2 items-center">
                        <div v-for="i, count in ingredients.filter((x, y) => y < 4)" v-if="!isLoading && recipe"
                            class="bg-stone-100 rounded-xl p1">
                            <NuxtImg :src="`https://www.themealdb.com/images/ingredients/${i.name}-medium.png`" alt=""
                                class="rounded-xl object-contain mxa  wmax " :custom="true"
                                v-slot="{ src, isLoaded, imgAttrs }">
                                <!-- Show the actual image when loaded -->
                                <img v-if="isLoaded" v-bind="imgAttrs" :src="src" class="rounded-xl object-contain">

                                <!-- Show a placeholder while loading -->
                                <Skeleton v-if="!isLoaded" class=" h3rem bg-stone-200 rounded-2xl w-full" />
                            </NuxtImg>
                        </div>
                        <div v-for="i, count in [1, 2, 3, 4]" v-if="isLoading" class="bg-stone-100 rounded-xl">


                            <!-- Show a placeholder while loading -->
                            <Skeleton class=" h4rem bg-stone-200 rounded-2xl w-full" />

                        </div>
                    </div>
                    <Button :disabled="isLoading"
                        class="mt3 rounded-xl w-full py2 px6 text-base text-stone-900 bg-stone-200 flex gap-x-2 items-center justify-center">
                        <Icon name="solar:card-search-linear" size="26" />
                        Learn more
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
