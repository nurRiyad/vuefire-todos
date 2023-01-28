<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const onClick = () => {
  router.push('/dashboard');
};
</script>

<template>
  <div class="hero min-h-[70vh] bg-base-100">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Procrasti-Nation</h1>
        <p class="py-6">
          Procrasti-Nation: Vue3, Firebase, VueFire, Tailwindcss, DaisyUi
          powered to-do app. Create, update, delete tasks with ease, and user
          authentication. Boss up your task game now!
        </p>
        <button @click="onClick" class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</template>
