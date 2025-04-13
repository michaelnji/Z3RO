<script lang="ts" setup>

</script>
<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div class="space-y-4">
        <DeviceInfo />
        <TimeMetrics/>
        <Football/>
      </div>
      <Watchlist />
      <div class="space-y-4">
        <Quote />
        <PicOfDay/>
      </div>
    </div>
  </div>
</template>

