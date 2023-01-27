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
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <button @click="onClick" class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</template>
