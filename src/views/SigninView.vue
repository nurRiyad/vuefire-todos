<script setup lang="ts">
import Google from '@/components/svg/Google.vue';
import Info from '@/components/svg/Info.vue';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const provider = new GoogleAuthProvider();

const auth = getAuth();
const router = useRouter();

const email = ref('');
const sentMail = ref(false);
const showProcessing = ref(true);

// For Local Dev -> url: 'http://localhost:5173/signin',
const actionCodeSettings = {
  url: 'https://vuefire-todos.netlify.app/',
  handleCodeInApp: true,
};

const googleSignIn = () => {
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

const sentEmaliForVerify = () => {
  if (email.value.length >= 5) {
    sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email.value);
        sentMail.value = true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }
};

onMounted(() => {
  // Confirm the link is a sign-in with email link.
  showProcessing.value = true;
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn') || '';
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation') || '';
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.

        console.log('You are loggedin');

        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        router.push('/dashboard');
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
  showProcessing.value = false;
});
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto">
    <div class="flex justify-center h-full items-center">
      <div class="flex flex-col space-y-4 p-10 m-5 rounded-lg shadow-md">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input input-bordered input-primary w-full max-w-xs"
        />
        <button
          @click="sentEmaliForVerify"
          class="btn btn-primary"
          :class="{ loading: showProcessing === true }"
        >
          Sign Up With Email
        </button>
        <button @click="googleSignIn" class="btn btn-primary gap-1">
          Signin Wiht Google
          <Google class="w-3" />
        </button>
        <div v-if="sentMail" class="alert alert-info shadow-lg">
          <div>
            <Info />
            <span>Check Your Mail for Varification Link</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
