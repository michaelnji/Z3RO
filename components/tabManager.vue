<script lang="ts" setup>
const emit = defineEmits<(e: 'tab-change', tab: string) => void>()
defineProps<{
    tab: string
}>()


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
function changeTabs(tab: string
) {
    emit("tab-change", tab)
}
</script>
<template>
    <div>
        <div class="p3 rounded-xl flex items-center justify-center gap-x3 w-max max-w-3xl mx-auto glass">
            <Button v-for="item in tabItems"
                class="bg-transparent hover:bg-white transition flex capitalize gap-2 text-sm duration-300 rounded-lg py1 px3 font-bold "
                @click="changeTabs(item.title)" :class="{ 'bg-white': tab === item.title }">
                <Icon :name="item.icon" size="30" /> <span class="hidden md:inline text-base"> {{ item.title }}</span>
            </Button>

        </div>
    </div>
</template>


