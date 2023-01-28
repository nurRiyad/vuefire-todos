<template>
  <header class="bg-base-100 border-b">
    <div class="container max-w-7xl mx-auto navbar">
      <div class="navbar-start">
        <RouterLink
          to="/"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isRoot }"
        >
          Home
        </RouterLink>
        <RouterLink
          v-if="user"
          to="/dashboard"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': !isRoot }"
        >
          Dashboard
        </RouterLink>
      </div>
      <div class="navbar-end">
        <RouterLink v-if="!user" to="/signin" class="btn btn-primary">
          SignIn
        </RouterLink>
        <div v-else class="dropdown dropdown-end hover:text-primary">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full ring-2">
              <img
                :src="
                  user.photoURL ||
                  'https://www.nurriyad.xyz/_nuxt/profilepic.e7877b41.webp'
                "
              />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li @click="onLogoutClick"><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCurrentUser } from 'vuefire';
import { getAuth, signOut } from 'firebase/auth';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const user = useCurrentUser();
const router = useRouter();
const route = useRoute();

const isRoot = computed(() => (route.fullPath === '/' ? true : false));

const onLogoutClick = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      router.push('/');
    })
    .catch((error) => {
      // An error happened.
      alert(error.message);
    });
};
</script>
