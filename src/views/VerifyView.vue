<script setup lang="ts">
import { async } from '@firebase/util';
import { getCurrentUser } from 'vuefire';
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();
</script>

<template>
  <div class="container mx-auto max-w-7xl">
    <h1>This is email verify page</h1>
  </div>
</template>
