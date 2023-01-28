<script setup lang="ts">
import { computed, ref } from 'vue';
import { doc, setDoc } from 'firebase/firestore';
import { getCurrentUser, useFirestore } from 'vuefire';

interface Prpos {
  title: string;
  description: string;
  type: string;
  id: string;
}

const props = withDefaults(defineProps<Prpos>(), {
  title: 'No Task Available',
  description: 'No description available',
  type: 'inprogress',
  id: '',
});

let isUpdateActive = ref(false);

const isChecked = computed(() => props.type === 'completed');

const onClicked = async () => {
  try {
    isUpdateActive.value = true;

    const db = useFirestore();
    const user = await getCurrentUser();

    const newType = props.type === 'completed' ? 'inprogress' : 'completed';

    const obj = {
      title: props.title,
      description: props.description,
      type: newType,
    };

    const todoRef = doc(db, `users/${user?.uid}/todos`, props.id);
    setDoc(todoRef, obj, { merge: true });
  } catch (error) {
    console.log(error);
  }
  isUpdateActive.value = false;
};
</script>

<template>
  <div
    class="flex justify-between items-center cursor-pointer px-5 py-2"
    @click="onClicked"
  >
    <div>
      <h1
        class="text-2xl font-semibold"
        :class="{ 'text-gray-400': isChecked }"
      >
        {{ title }}
      </h1>
      <p class="text-gray-800 mt-2" :class="{ 'text-gray-400': isChecked }">
        {{ description }}
      </p>
    </div>
    <button
      v-if="isUpdateActive"
      class="btn btn-square btn-sm btn-primary loading"
    ></button>
    <input
      v-else
      type="checkbox"
      :checked="isChecked"
      class="checkbox checkbox-primary"
    />
  </div>
</template>
