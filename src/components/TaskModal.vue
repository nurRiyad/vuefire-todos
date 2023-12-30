<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { getCurrentUser, useFirestore } from 'vuefire'

const Close = defineAsyncComponent(() => import('@/components/svg/Close.vue'))

const title = ref('')
const des = ref('')
const stat = ref('inprogress')
const isCreating = ref(false)
const showModal = ref(false)

const createTaks = async () => {
  if (title.value) {
    try {
      isCreating.value = true

      const user = await getCurrentUser()
      const db = useFirestore()

      const obj = {
        title: title.value,
        description: des.value,
        type: stat.value,
      }
      await addDoc(
        collection(db, `users/${user?.uid}/todos`),
        obj,
      )

      title.value = ''
      des.value = ''
      showModal.value = false
    }
    catch (error) {
      console.log(error)
    }

    isCreating.value = false
  }
}
</script>

<template>
  <div>
    <!-- The button to open modal -->
    <label
      for="my-modal"
      class="btn btn-sm sm:btn-md btn-primary w-28"
      @click="showModal = true"
    >
      New Task
    </label>

    <!-- Put this part before </body> tag -->
    <div class="modal" :class="{ 'modal-open': showModal }">
      <div class="modal-box">
        <div class="flex justify-between">
          <h3 class="font-bold text-lg">
            Create New Task
          </h3>
          <button
            class="btn btn-circle btn-primary btn-sm btn-outline"
            @click="showModal = false"
          >
            <Close />
          </button>
        </div>

        <div class="py-4 flex flex-col space-y-3">
          <input
            v-model="title"
            type="text"
            placeholder="Title"
            class="input input-bordered input-primary w-full"
          >
          <input
            v-model="des"
            type="text"
            placeholder="Desscription"
            class="input input-bordered input-primary w-full"
          >
        </div>
        <div class="flex justify-end">
          <button
            class="btn btn-primary"
            :class="{ loading: isCreating }"
            @click="createTaks"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
