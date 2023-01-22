<template>
  <div class="min-h-screen">
    <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0 text-center">
      <template v-if="false">
        <p>Loading...</p>
      </template>
      <template v-else>
        <div class="flex flex-col items-end space-y-5">
          <input
            type="email"
            placeholder="email"
            class="input input-bordered input-primary w-full max-w-md"
          />
          <input
            type="password"
            placeholder="password"
            class="input input-bordered input-primary w-full max-w-md"
          />
          <button @click="signinPopup" class="btn btn-primary max-w-sm">
            Login
          </button>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const auth = getAuth();

const signinPopup = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
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

<style scoped>
.avatar {
  padding: 1em 0;
}
main > button {
  margin: 1em 0;
}
</style>
