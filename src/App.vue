<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="gd-container">
    <Navbar />
    <main>
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
