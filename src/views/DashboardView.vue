<script setup lang="ts">
import { useFirestore } from 'vuefire';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';

const db = useFirestore();

const todos = useCollection(collection(db, 'todos'));
</script>

<template>
  <div class="container mx-auto max-w-7xl">
    <div class="hero min-h-[70vh] px-5">
      <template v-for="todo in todos" :key="todo.name">
        <pre>{{ todo }}</pre>
      </template>
    </div>
  </div>
</template>
