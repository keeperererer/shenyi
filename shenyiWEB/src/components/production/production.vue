<template>
  <div>
    <div class="search">
      <Input
        v-model="value4"
        placeholder="请输入产品标准号"
        style="width: 200px"
      />
      <Button>搜索</Button>
    </div>
    <Table
      border
      ref="selection"
      :columns="columns4"
      :data="data1"
      @on-row-click="detailOnClick"
    >
    </Table>
    <div class="button">
      <Button type="warning">删除</Button>
      <Button @click="handleSelectAll(true)">全选</Button>
      <Button @click="handleSelectAll(false)">取消选择</Button>
    </div>
  </div>
</template>
<script>
import { Table, Button, Input } from "view-design";
export default {
  components: {
    Table,
    Button,
    Input
  },
  data() {
    return {
      value4: "",
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "缩略图",
          key: "img"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "标准号",
          key: "standardNum"
        },
        {
          title: "添加时间",
          key: "date"
        }
      ],
      data1: [
        {
          img: "John Brown",
          name: "test1",
          standardNum: "1",
          date: "2016-10-03"
        },
        {
          img: "John Brown",
          name: "test2",
          standardNum: "2",
          date: "2016-10-03"
        },
        {
          img: "John Brown",
          name: "test3",
          standardNum: "3",
          date: "2016-10-03"
        },
        {
          img: "John Brown",
          name: "test4",
          standardNum: "4",
          date: "2016-10-03"
        }
      ]
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    detailOnClick(data) {
      this.$router.push({ name: "detail", params: data.standardNum });
    }
  }
};
</script>
<style scoped>
.search {
  margin-bottom: 10px;
}
.button {
  margin-top: 10px;
}
</style>
