<script setup lang="ts">
import { ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import TaskModal from '@/components/TaskModal.vue'
import Tasks from '@/components/Tasks.vue'

const showTaskType = ref('all')
const searchText = ref('')

const [parent] = useAutoAnimate()
</script>

<template>
  <div class="container mx-auto max-w-7xl">
    <div class="py-5 space-y-5">
      <div class="flex justify-center align-baseline space-x-5">
        <input
          v-model="searchText"
          type="text"
          placeholder="Type here to Search"
          class="input input-bordered input-primary w-full max-w-sm"
        >
        <TaskModal />
      </div>

      <div ref="parent" class="space-y-3">
        <Suspense>
          <!-- component with nested async dependencies -->
          <Tasks
            :show-task-type="showTaskType"
            :search-text="searchText"
          />

          <!-- loading state via #fallback slot -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </div>
      <div class="flex justify-center">
        <div class="btn-group">
          <button
            class="btn"
            :class="{ 'btn-active': showTaskType === 'all' }"
            @click="showTaskType = 'all'"
          >
            All
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
            :class="{ 'btn-active': showTaskType === 'inprogress' }"
            @click="showTaskType = 'inprogress'"
          >
            Todos
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
