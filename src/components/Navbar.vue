<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()

const isLoading = computed(() => user.value === undefined)

const isRoot = computed(() => (route.fullPath === '/'))

const onLogoutClick = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      router.push('/')
    })
    .catch((error) => {
      // An error happened.
      // eslint-disable-next-line no-alert
      alert(error.message)
    })
}
</script>

<template>
  <header class="border-b border-base-300">
    <div class="container max-w-4xl mx-auto navbar">
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
        <button v-if="isLoading" class="btn btn-circle btn-primary btn-disabled">
          <span class="loading loading-spinner" />
        </button>
        <div v-else-if="user" class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost ring-2  btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Profile Image" :src="user?.photoURL || '/default-man.jpg'">
            </div>
          </label>
          <ul tabindex="0" class="menu menu-sm bg-base-300 dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
            <li @click="onLogoutClick">
              <a class="justify-between">
                Log Out
              </a>
            </li>
          </ul>
        </div>
        <RouterLink v-else-if="!user && route.fullPath !== '/signin' " to="/signin" class="btn btn-primary">
          SignIn
        </RouterLink>
      </div>
    </div>
  </header>
</template>
