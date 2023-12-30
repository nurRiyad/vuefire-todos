<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { getCurrentUser, useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'

interface Props {
  showTaskType: string
  searchText: string
}

const props = withDefaults(defineProps<Props>(), {
  showTaskType: 'inprogress',
  searchText: '',
})

const EmptyCard = defineAsyncComponent(() => import('@/components/EmptyCard.vue'))
const TaskCard = defineAsyncComponent(() => import('@/components/TaskCard.vue'))

const isDataFetched = ref(true)

const db = await useFirestore()
const user = await getCurrentUser()
const todos = await useCollection(collection(db, `/users/${user?.uid}/todos`))

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    if (props.showTaskType === 'all')
      return true
    else return todo.type === props.showTaskType
  })
})

watch(todos, () => {
  isDataFetched.value = false
})

const searchedTodos = computed(() => {
  return filteredTodos.value.filter((todo) => {
    if (props.searchText.length <= 1) {
      return true
    }
    else {
      const title = todo.title.toLowerCase() || ''
      return title.includes(props.searchText.toLocaleLowerCase())
    }
  })
})
</script>

<template>
  <div
    v-for="todo in searchedTodos"
    :key="todo.id"
    class="max-w-3xl mx-auto shadow-md"
  >
    <TaskCard
      :id="todo.id"
      :title="todo.title"
      :description="todo.description"
      :type="todo.type"
    />
  </div>
  <div v-if="isDataFetched" class="space-y-5 mt-10 flex flex-col items-center">
    <div class="skeleton w-[48rem] h-8" />
    <div class="skeleton w-[48rem] h-8" />
    <div class="skeleton w-[48rem] h-8" />
    <div class="skeleton w-[48rem] h-8" />
  </div>
  <div
    v-else-if="searchedTodos.length === 0"
    class="max-w-2xl mx-auto shadow-md"
  >
    <EmptyCard />
  </div>
</template>
