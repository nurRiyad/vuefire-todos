<script setup lang="ts">
import { getCurrentUser, useFirestore } from 'vuefire';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';
import TaskCard from '@/components/TaskCard.vue';
import { computed } from 'vue';

interface Props {
  showTaskType: string;
}

const props = withDefaults(defineProps<Props>(), {
  showTaskType: 'inprogress',
});

const db = useFirestore();
const user = await getCurrentUser();

const todos = useCollection(collection(db, `/users/${user?.uid}/todos`));

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => todo.type === props.showTaskType);
});
</script>

<template>
  <div
    v-for="todo in filteredTodos"
    :key="todo.title"
    class="max-w-2xl mx-auto border p-3 rounded-md shadow-md"
  >
    <TaskCard :title="todo.title" :description="todo.description" />
  </div>
</template>
