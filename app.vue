<script lang="ts" setup>
import '@unocss/reset/tailwind-compat.css';
import './assets/css/custom.css'
import './assets/css/theme.css'
</script>
<template>
  <div class=" bg-3 hscreen">
    <NuxtLayout>
      <div>
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
<style>
.bg-1 {
  background: linear-gradient(90deg, #FFD28Eff, #FFD192ff, #FFCF96ff, #FFCE9Bff, #FFCC9Fff, #FFCBA3ff, #FFC9A7ff, #FFC8ABff, #FFC6AFff, #FFC5B4ff, #FFC3B8ff, #FFC2BCff, #FFC0C0ff);

}

.bg-2 {
  background: linear-gradient(135deg, #F8FF8Fff, #F3FF96ff, #EFFF9Dff, #EAFFA4ff, #E5FFAAff, #E0FFB1ff, #DCFFB8ff, #D7FFBFff, #D2FFC6ff, #CDFFCDff, #C9FFD3ff, #C4FFDAff, #BFFFE1ff);
}

.bg-3 {
  background: #daa6ff;
  background: linear-gradient(90deg, rgba(218, 166, 255, 1) 0%, rgba(255, 201, 212, 1) 53%, rgba(252, 176, 69, 1) 100%);
}

.bg-4 {
  background: #feffa6;
  background: linear-gradient(90deg, rgba(254, 255, 166, 1) 0%, rgba(201, 255, 204, 1) 53%, rgba(69, 215, 252, 1) 100%);
}
</style>