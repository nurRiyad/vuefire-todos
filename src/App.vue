<template>
  <div id="wrapper">
    <header id="page-banner">
      <h1 class="title">todos</h1>
      <input type="text" name="task" id="task" v-model.trim="tempTask" @keyup.enter="insertTask" />
    </header>

    <PrintList :list="taskList" @del-fun="deleteTask"></PrintList>
    <br />
    <Clear @clear-component="clearComponent"></Clear>
    <Count :task-list="taskList"></Count>
  </div>
</template>

<script>
import PrintList from "./components/PrintList.vue";
import Count from "./components/Count.vue";
import Clear from "./components/Clear.vue";

export default {
  components: {
    PrintList,
    Count,
    Clear,
  },
  data() {
    return {
      tempTask: "",
      taskList: [],
    };
  },
  methods: {
    insertTask() {
      if (this.tempTask != "") {
        this.taskList.push({
          task: this.tempTask,
          isComplete: false,
        });
      }
      this.tempTask = "";
    },
    deleteTask(index) {
      //console.log(index);
      this.taskList.splice(index, 1);
    },
    clearComponent() {
      //console.log("I am called");
      this.taskList = this.taskList.filter((li) => {
        if (li.isComplete) return false;
        else return true;
      });
    },
  },
};
</script>

<style>
#status {
  padding-left: 20px;
}
#wrapper {
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 6px;
  box-shadow: 0px 1px 6px rgba(100, 70, 70, 0.2);
  box-sizing: border-box;
  padding: 0 0 20px;
  overflow: hidden;
  border: 1px solid lightgray;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
#page-banner {
  font-size: 2rem;
  text-align: center;
  color: blueviolet;
}
input[type="text"] {
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>
