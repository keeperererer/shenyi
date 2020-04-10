<template>
  <div class="contianer">
    <div class="search">
      <Input
        v-model="value4"
        placeholder="请输入产品标准号"
        style="width: 200px;"
      />
      <Button>搜索</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value4: ""
    };
  }
};
</script>
<style scoped></style>
