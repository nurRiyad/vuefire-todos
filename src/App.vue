<script setup lang="ts">
import { RouterView } from "vue-router";

import { useFirestore } from "vuefire";

const db = useFirestore();
console.log(db);
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
