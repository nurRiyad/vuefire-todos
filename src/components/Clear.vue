<template>
  <button id="clear" @click="$emit('clear-component')">Clear Complete</button>
</template>

<script>
emits: ["clear-component"];
export default {};
</script>

<style>
#clear {
  width: 150px;
  margin-top: 10px;
}
</style>
