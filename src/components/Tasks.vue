<script setup lang="ts">
import { getCurrentUser, useFirestore } from 'vuefire';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';
import TaskCard from '@/components/TaskCard.vue';
import EmptyCard from '@/components/EmptyCard.vue';
import { computed } from 'vue';

interface Props {
  showTaskType: string;
  searchText: string;
}

const props = withDefaults(defineProps<Props>(), {
  showTaskType: 'inprogress',
  searchText: '',
});

const db = useFirestore();
const user = await getCurrentUser();

const todos = useCollection(collection(db, `/users/${user?.uid}/todos`));

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    if (props.showTaskType === 'all') return true;
    else return todo.type === props.showTaskType;
  });
});

const searchedTodos = computed(() => {
  return filteredTodos.value.filter((todo) => {
    if (props.searchText.length <= 2) return true;
    else {
      const title = todo.title.toLowerCase() || '';
      return title.includes(props.searchText.toLocaleLowerCase());
    }
  });
});
</script>

<template>
  <div
    v-for="todo in searchedTodos"
    :key="todo.title"
    class="max-w-2xl mx-auto border p-3 rounded-md shadow-md"
  >
    <TaskCard
      :title="todo.title"
      :description="todo.description"
      :type="todo.type"
      :id="todo.id"
    />
  </div>
  <div
    v-if="searchedTodos.length === 0"
    class="max-w-2xl mx-auto border p-3 rounded-md shadow-md"
  >
    <EmptyCard />
  </div>
</template>
