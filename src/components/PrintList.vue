<template>
  <button @click="changeTab('active')">Active</button>
  <button @click="changeTab('completed')">Completed</button>
  <button @click="changeTab('all')">All</button>

  <div v-for="(li, index) in list" :id="index" :key="li.key">
    <div class="list" v-if="computeCondition(li.isComplete)">
      <input type="checkbox" name="complete" v-model="li.isComplete" />
      <del v-if="li.isComplete">
        <span class="task"> {{ li.task }}</span>
      </del>
      <span v-else class="task"> {{ li.task }}</span>
      <span class="delete" @click="$emit('del-fun', index)">Delete</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  emits: ["del-fun"],
  data() {
    return {
      currentStatus: "all",
    };
  },
  methods: {
    changeTab(str) {
      if (str == "all") this.currentStatus = "all";
      else if (str == "active") this.currentStatus = "active";
      else this.currentStatus = "completed";
    },
    computeCondition(checked) {
      if (this.currentStatus == "completed" && checked) return true;
      else if (this.currentStatus == "active" && checked == false) return true;
      else if (this.currentStatus == "all") return true;
      else return false;
    },
  },
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
.list:hover {
  border-color: darkorange;
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
button {
  margin-left: 20px;
  border: none;
  width: 100px;
  height: 30px;
}
button:hover {
  background-color: darkorange;
}
</style>
