<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const Tasks = defineAsyncComponent(() => import('@/components/Tasks.vue'))
const TaskModal = defineAsyncComponent(() => import('@/components/TaskModal.vue'))

const showTaskType = ref('all')
const searchText = ref('')

const [parent] = useAutoAnimate()
</script>

<template>
  <div class="container mx-auto max-w-7xl">
    <div class="py-5 px-4 space-y-5">
      <div class="flex justify-center align-baseline space-x-5">
        <input
          v-model="searchText"
          type="text"
          placeholder="Type here to Search"
          class="input input-sm sm:input-md input-bordered input-primary w-full max-w-sm"
        >
        <TaskModal />
      </div>

      <div class="flex justify-center space-x-2">
        <button
          class="btn btn-sm sm:btn-md sm:w-32"
          :class="{ 'btn-primary': showTaskType === 'all' }"
          @click="showTaskType = 'all'"
        >
          All
        </button>
        <button
          class="btn btn-sm sm:btn-md sm:w-32"
          :class="{ 'btn-primary': showTaskType === 'completed' }"
          @click="showTaskType = 'completed'"
        >
          Completed
        </button>
        <button
          class="btn btn-sm sm:btn-md sm:w-32"
          :class="{ 'btn-primary': showTaskType === 'inprogress' }"
          @click="showTaskType = 'inprogress'"
        >
          Todos
        </button>
      </div>

      <div ref="parent" class="space-y-3 overflow-hidden">
        <Suspense>
          <!-- component with nested async dependencies -->
          <Tasks
            :show-task-type="showTaskType"
            :search-text="searchText"
          />

          <!-- loading state via #fallback slot -->
          <template #fallback>
            <p class="text-xl sm:text-3xl text-center mt-20">
              Loading...
            </p>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
