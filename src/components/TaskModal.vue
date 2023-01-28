<script setup lang="ts">
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { getCurrentUser, useFirestore } from 'vuefire';
import Close from '@/components/svg/Close.vue';

let title = ref('');
let des = ref('');
let stat = ref('inprogress');
let isCreating = ref(false);
let showModal = ref(false);

const createTaks = async () => {
  if (title.value) {
    try {
      isCreating.value = true;

      const user = await getCurrentUser();
      const db = useFirestore();

      const obj = {
        title: title.value,
        description: des.value,
        type: stat.value,
      };
      const docRef = await addDoc(
        collection(db, `users/${user?.uid}/todos`),
        obj
      );

      title.value = '';
      des.value = '';
      showModal.value = false;
    } catch (error) {
      console.log(error);
    }

    isCreating.value = false;
  }
};
</script>

<template>
  <div>
    <!-- The button to open modal -->
    <label
      for="my-modal"
      @click="showModal = true"
      class="btn btn-primary btn-wide"
    >
      Create New Task
    </label>

    <!-- Put this part before </body> tag -->
    <div class="modal" :class="{ 'modal-open': showModal }">
      <div class="modal-box">
        <div class="flex justify-between">
          <h3 class="font-bold text-lg">Create New Task</h3>
          <button
            @click="showModal = false"
            class="btn btn-circle btn-primary btn-sm btn-outline"
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
          />
          <input
            v-model="des"
            type="text"
            placeholder="Desscription"
            class="input input-bordered input-primary w-full"
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="createTaks"
            class="btn btn-primary"
            :class="{ loading: isCreating }"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
