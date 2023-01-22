<script setup lang="ts">
import Google from '@/components/svg/Google.vue';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const provider = new GoogleAuthProvider();

const auth = getAuth();
const router = useRouter();

const email = ref('');
const password = ref('');

const googleSigninPopup = () => {
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

const signinWithEmailPass = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      router.push('/dashboard');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto">
    <div class="flex justify-center h-full items-center">
      <div
        class="bg-primary flex flex-col space-y-4 p-10 rounded-lg shadow-2xl"
      >
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input input-bordered input-secondary w-full max-w-xs"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input input-bordered input-secondary w-full max-w-xs"
        />
        <button @click="signinWithEmailPass" class="btn btn-secondary">
          Create New Account
        </button>
        <button @click="googleSigninPopup" class="btn btn-secondary">
          Signin Wiht Google
          <Google class="w-5" />
        </button>
      </div>
    </div>
  </div>
</template>
