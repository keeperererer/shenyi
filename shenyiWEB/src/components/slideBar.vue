<template>
  <div class="slideBar">
    <div class="slideBarItem cate" @click="navOnChange(1)">
      <span class="itemName">分类</span>
    </div>
    <div class="slideBarItem pro" @click="navOnChange(2)">
      <span class="itemName">产品</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "slideBar",
  components: {},
  data() {
    return {};
  },
  mounted: {
    // console.log(params)
  },
  methods: {
    navOnChange(e) {
      switch (e) {
        case 1:
          // console.log("fenlei");
          this.$router.push({ path: "/Category" });
          break;
        case 2:
          // console.log("chanpin");
          this.$router.push({ path: "/Production" });
          break;
      }
    }
  }
};
</script>
<style scoped>
.slideBar {
  min-height: 500px;
  background-color: antiquewhite;
  display: inline-block;
  width: 30%;
}
.slideBarItem {
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slideBarItem:active {
  color: #fff;
  background-color: rgb(120, 195, 238);
}
.slideBarItem:visited {
  color: #fff;
  background-color: rgb(120, 195, 238);
}
</style>
