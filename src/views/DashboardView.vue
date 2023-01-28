<script setup lang="ts">
import TaskModal from '@/components/TaskModal.vue';
import Tasks from '@/components/Tasks.vue';
import { ref } from 'vue';
import { useAutoAnimate } from '@formkit/auto-animate/vue';

let showTaskType = ref('inprogress');
let searchText = ref('');

const [parent] = useAutoAnimate();
</script>

<template>
  <div class="container mx-auto max-w-7xl">
    <div class="p-5 space-y-5">
      <div class="flex justify-center align-baseline space-x-5">
        <TaskModal />
        <input
          type="text"
          v-model="searchText"
          placeholder="Type here to Search"
          class="input input-bordered input-primary w-full max-w-xs"
        />
      </div>

      <div ref="parent">
        <Suspense>
          <!-- component with nested async dependencies -->
          <Tasks :showTaskType="showTaskType" :searchText="searchText" />

          <!-- loading state via #fallback slot -->
          <template #fallback> Loading... </template>
        </Suspense>
      </div>
      <div class="flex justify-center">
        <div class="btn-group">
          <button
            class="btn"
            :class="{ 'btn-active': showTaskType === 'inprogress' }"
            @click="showTaskType = 'inprogress'"
          >
            Todos
          </button>
          <button
            class="btn"
            :class="{ 'btn-active': showTaskType === 'completed' }"
            @click="showTaskType = 'completed'"
          >
            Completed
          </button>
          <button
            class="btn"
            :class="{ 'btn-active': showTaskType === 'all' }"
            @click="showTaskType = 'all'"
          >
            All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
