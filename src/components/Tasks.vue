<script setup lang="ts">
import { getCurrentUser, useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import { computed, defineAsyncComponent } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  showTaskType: 'inprogress',
  searchText: '',
})

const EmptyCard = defineAsyncComponent(() => import('@/components/EmptyCard.vue'))
const TaskCard = defineAsyncComponent(() => import('@/components/TaskCard.vue'))

interface Props {
  showTaskType: string
  searchText: string
}

const db = useFirestore()
const user = await getCurrentUser()

const todos = useCollection(collection(db, `/users/${user?.uid}/todos`))

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    if (props.showTaskType === 'all')
      return true
    else return todo.type === props.showTaskType
  })
})

const searchedTodos = computed(() => {
  return filteredTodos.value.filter((todo) => {
    if (props.searchText.length <= 2) {
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
    class="max-w-2xl mx-auto shadow-md"
  >
    <TaskCard
      :id="todo.id"
      :title="todo.title"
      :description="todo.description"
      :type="todo.type"
    />
  </div>
  <div
    v-if="searchedTodos.length === 0"
    class="max-w-2xl mx-auto  shadow-md"
  >
    <EmptyCard />
  </div>
</template>
