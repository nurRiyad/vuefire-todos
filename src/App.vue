<script>
import PrintList from "./components/PrintList.vue";
import Count from "./components/Count.vue";

export default {
  components: {
    PrintList,
    Count,
  },
  data() {
    return {
      tempTask: "",
      taskList: [],
      currentStatus: "All",
    };
  },
  methods: {
    insertfun() {
      this.taskList.push({
        task: this.tempTask,
        isComplete: false,
      });
      this.tempTask = "";
    },
    del(index) {
      console.log(index);
      this.taskList.splice(index, 1);
    },
    changeTab(str) {
      this.currentStatus = str;
    },
  },
  computed: {
    isAll() {
      if (this.currentStatus == "all") return true;
      else return false;
    },
    isCom() {
      if (this.currentStatus == "complete") return true;
      else return false;
    },
    status() {
      if (this.currentStatus == "completed") return "Completed";
      else if (this.currentStatus == "active") return "Active";
      else return "All";
    },
  },
  activelist() {
    if (this.currentStatus == "active") {
      let x = this.taskList.filter((list) => {
        if (list.isComplete == false) return true;
        else return false;
      });
      console.log(x);
      return x;
    } else if (this.currentStatus == "completed") {
      let x = this.taskList.filter((list) => {
        if (list.isComplete) return true;
        else return false;
      });
      console.log(x);
      return x;
    } else {
      console.log(this.taskList);
      return this.taskList;
    }
  },
};
</script>

<template>
  <div id="wrapper">
    <header id="page-banner">
      <h1 class="title">todos</h1>
      <input type="text" name="task" id="task" v-model="tempTask" @keyup.enter="insertfun" />
    </header>

    <button @click="changeTab('active')">Active</button>
    <button @click="changeTab('all')">All</button>
    <button @click="changeTab('completed')">Completed</button>
    <PrintList :list="activelist" @del-fun="del"></PrintList>
  </div>
</template>

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
