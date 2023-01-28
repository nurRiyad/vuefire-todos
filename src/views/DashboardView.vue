<script setup lang="ts">
import { useFirestore } from 'vuefire';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';
import TaskModal from '@/components/TaskModal.vue';
import TaskCard from '@/components/TaskCard.vue';

const db = useFirestore();

const todos = useCollection(collection(db, 'todos'));
</script>

<template>
  <div class="container mx-auto max-w-7xl">
    <div class="p-5 space-y-5">
      <div class="flex justify-center align-baseline space-x-5">
        <TaskModal />
        <input
          type="text"
          placeholder="Type here to Search"
          class="input input-bordered input-primary w-full max-w-xs"
        />
      </div>

      <div
        v-for="n in 10"
        :key="n"
        class="max-w-2xl mx-auto border p-3 rounded-md shadow-md"
      >
        <TaskCard />
      </div>
      <div class="flex justify-center">
        <div class="btn-group">
          <button class="btn btn-active">Todos</button>
          <button class="btn">Completed</button>
          <button class="btn">All</button>
        </div>
      </div>
    </div>
  </div>
</template>
