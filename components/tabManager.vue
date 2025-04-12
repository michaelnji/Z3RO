<script lang="ts" setup>
const tabItems = [
    {
        title:'overview',
        icon:'solar:home-bold-duotone'
    },
    {
        title:'articles',
        icon:'solar:book-2-bold-duotone'
    },
    {
        title:'anime',
        icon:'solar:star-circle-bold-duotone'
    },
    {
        title:'weather',
        icon:'solar:cloud-bold-duotone'
    },
]
const currentTab = ref<string>('overview')
</script>
<template>
    <div>
        <div
            class="p3 rounded-xl flex items-center justify-center gap-x3 w-max max-w-3xl mx-auto bg-stone-300 bg-opacity-35">
            <Button v-for="item in tabItems"
                class="bg-transparent hover:bg-white transition flex capitalize gap-2 duration-300 rounded-xl py1 px3 font-bold "
                :class="{'bg-white':currentTab === item.title}"
                >
                <Icon :name="item.icon" size="24" /> {{ item.title }}
            </Button>

        </div>
    </div>
</template>


