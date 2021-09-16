<template>
  <p>Active Task : {{ count }}</p>
</template>

<script>
export default {
  props: ["taskList"],
  computed: {
    count() {
      let c = 0;
      for (let list of this.taskList) {
        if (!list.isComplete) {
          c += 1;
        }
      }
      return c;
    },
  },
};
</script>

<style>
p {
  float: right;
  padding-right: 20px;
}
</style>
