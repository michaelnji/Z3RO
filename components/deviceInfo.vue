<script lang="ts" setup>
import { useMemory } from '@vueuse/core'
import { useBattery } from '@vueuse/core'
import { useFps } from '@vueuse/core'
import { useNetwork } from '@vueuse/core'

const { isOnline, offlineAt, downlink, downlinkMax, effectiveType, saveData, type } = useNetwork()

const fps = useFps()
function size(v: number) {
    const kb = v / 1024 / 1024
    return `${kb.toFixed(2)} MB`
}

const { charging, level } = useBattery()
</script>
<template>
    <div>
        <div class="rounded-3xl bg-white p6">

            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt3">
                <div class="rounded-3xl bg-stone-100 p3 px4 text-sm flex items-center gap-x-2">
                    <Icon v-if="charging" class="text-orange-600" name="solar:battery-charge-outline" size="30" />
                    <Icon v-if="!charging" name="solar:battery-full-bold-duotone" size="30" />
                    <p class="">Battery: {{level }}%</p>
                </div>
                <div class="rounded-3xl bg-stone-100 p3 px4 text-sm flex items-center gap-x-2">

                    <Icon name="solar:special-effects-broken" size="30" />
                    <p class="">FPS: {{fps }}</p>
                </div>
                <div class="rounded-3xl bg-stone-100 p3 flex items-center gap-x-2 px4 text-sm">

                    <Icon name="solar:round-transfer-diagonal-outline" size="30" />
                    <p class=" w-2/3  flex items-center gap-x-1">Signal: {{ effectiveType }}</p>
                </div>
            </div>
        </div>
    </div>

</template>


