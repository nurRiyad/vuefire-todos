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
    <div class="hero min-h-[70vh] px-5">
      <div class="alert alert-info shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Please check your mail to verify account</span>
        </div>
      </div>
    </div>
  </div>
</template>
