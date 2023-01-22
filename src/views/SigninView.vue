<script setup lang="ts">
import Google from '@/components/svg/Google.vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router';

const provider = new GoogleAuthProvider();

const auth = getAuth();
const router = useRouter();

const signinPopup = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // redirect to dashboard page
      router.push('/dashboard');
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto">
    <div class="flex justify-center h-full items-center">
      <button @click="signinPopup" class="btn btn-primary gap-2">
        Signin Wiht Google
        <Google class="w-5" />
      </button>
    </div>
  </div>
</template>
