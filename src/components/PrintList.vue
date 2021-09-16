<template>
  <div class="list" v-for="(li, index) in list" :id="index" :key="li.key">
    <input type="checkbox" name="complete" v-model="li.isComplete" />
    <del v-if="li.isComplete">
      <span class="task"> {{ li.task }}</span>
    </del>
    <span v-else class="task"> {{ li.task }}</span>
    <span class="delete" @click="$emit('del-fun', index)">Delete</span>
  </div>
</template>

<script>
export default {
  props: ["list"],
  emits: ["del-fun"],
};
</script>

<style>
.list {
  list-style-type: none;
  padding: 0;
  margin: 30px;
  padding: 20px;
  border-left: 5px solid #ddd;
  margin: 20px 10px;
}

.task {
  padding-left: 7px;
}

.delete {
  float: right;
  background: #e24e55;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}
</style>
