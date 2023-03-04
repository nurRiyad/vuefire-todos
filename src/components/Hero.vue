<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onClick = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="hero min-h-[70vh]">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          The Never-Ending To-Do List
        </h1>
        <p class="py-6">
          Vue3, Vuefire, Firebase, Tailwindcss powered to-do app. Create,
          update, delete tasks with ease, and user authentication. Boss up your
          task game now!
        </p>
        <button class="btn btn-primary" @click="onClick">
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>
