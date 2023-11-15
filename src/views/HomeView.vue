<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const Hero = defineAsyncComponent(() => import('@/components/Hero.vue'))
</script>

<template>
  <div>
    <Hero />
  </div>
</template>
