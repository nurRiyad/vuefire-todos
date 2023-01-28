<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { useHead } from '@unhead/vue';
import { useAutoAnimate } from '@formkit/auto-animate/vue';

const [parent] = useAutoAnimate();

// add meta tags
const description =
  'Vuefire Todos: Vue3, Vuefire, Firebase, Tailwindcss powered to-do app. Create, update, delete tasks with ease, and user authentication. Boss up your task game now!';
const ogTitle =
  'Vuefire Todos: Vue3, Vuefire, Firebase, Tailwindcss powered to-do app. Create, update, delete tasks with ease, and user authentication. Boss up your task game now!';
const twitterDescription =
  'Vuefire Todos: Vue3, Vuefire, Firebase, Tailwindcss powered to-do app. Create, update, delete tasks with ease, and user authentication. Boss up your task game now!';
const image = 'https://vuefire-todos.netlify.app//android-chrome-512x512.png';
const mySite = 'https://vuefire-todos.netlify.app/';
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    {
      name: 'description',
      content: description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: mySite },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: mySite,
    },
    {
      property: 'og:title',
      content: ogTitle,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@debs_obrien' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: mySite,
    },
    {
      name: 'twitter:title',
      content: ogTitle,
    },
    {
      name: 'twitter:description',
      content: twitterDescription,
    },
    {
      name: 'twitter:image',
      content: image,
    },
  ],
});
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
