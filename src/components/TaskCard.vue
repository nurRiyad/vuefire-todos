<script setup lang="ts">
import { computed, ref } from 'vue';
import { doc, setDoc } from 'firebase/firestore';
import { getCurrentUser, useFirestore } from 'vuefire';
import Delete from '@/components/svg/Delete.vue';
import { deleteDoc } from 'firebase/firestore';

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

let isOperationActive = ref(false);

const isChecked = computed(() => props.type === 'completed');

const onClicked = async () => {
  try {
    isOperationActive.value = true;

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
  isOperationActive.value = false;
};

const onDeleteClick = async () => {
  try {
    isOperationActive.value = true;

    const db = useFirestore();
    const user = await getCurrentUser();

    await deleteDoc(doc(db, `users/${user?.uid}/todos`, props.id));
  } catch (error) {
    console.log(error);
  }
  isOperationActive.value = false;
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
      <p class="mt-2" :class="{ 'text-gray-400': isChecked }">
        {{ description }}
      </p>
    </div>
    <div class="flex space-x-2 items-end">
      <button
        v-if="isOperationActive"
        class="btn btn-square btn-xs btn-primary loading"
      ></button>
      <button
        v-if="isChecked && !isOperationActive"
        @click.stop="onDeleteClick"
        class="btn btn-square btn-xs btn-error"
      >
        <Delete />
      </button>
      <input
        v-if="!isOperationActive"
        type="checkbox"
        :checked="isChecked"
        class="checkbox checkbox-primary"
      />
    </div>
  </div>
</template>
