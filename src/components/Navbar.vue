<template>
  <div class="bg-primary">
    <div class="container max-w-7xl mx-auto navbar text-primary-content">
      <div class="navbar-start">
        <RouterLink to="/" class="btn btn-ghost normal-case text-xl">
          todos
        </RouterLink>
        <RouterLink
          v-if="user"
          to="/dashboard"
          class="btn btn-ghost normal-case text-xl"
        >
          dashboard
        </RouterLink>
      </div>
      <div class="navbar-end">
        <RouterLink v-if="!user" to="/login" class="btn btn-secondary">
          Get started
        </RouterLink>
        <div v-else class="dropdown dropdown-end text-primary">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="user.photoURL || ''" />
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
  </div>
</template>

<script setup lang="ts">
import { useCurrentUser } from 'vuefire';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const user = useCurrentUser();
const router = useRouter();

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
