<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const [parent] = useAutoAnimate()
</script>

<template>
  <div class="gd-container">
    <Navbar />
    <main ref="parent">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
</style>
