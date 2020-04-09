<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Storage from "@/tool/storage";
export default {
  name: "App",
  mounted() {
    let value = Storage.getItem("token");
    if (!value) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100%;
}
.ivu-tree-title {
  width: 100%;
}
.ivu-table-cell{
  text-overflow: initial;
}
</style>
