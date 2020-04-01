<template>
  <div class="cate">
    <Button
      size="large"
      icon="ios-add"
      shape="circle"
      class="addButton"
    ></Button>
    <div class="addInput">
      <select v-model="model7" class="addSelect">
        <option value="volvo">添加顶级分类</option>
        <optgroup label="为以下分类添加下级">
          <option v-for="(item, index) in cates" :key="index">{{
            item.value
          }}</option>
        </optgroup>
      </select>
      <Input
        v-model="value4"
        placeholder="Enter something..."
        style="width: 200px"
      />
      <Button>添加</Button>
    </div>
    <Table border :columns="columns5" :data="data5"></Table>
  </div>
</template>
<script>
import { Button, Table, Icon, Input } from "view-design";

export default {
  components: {
    Button,
    Table,
    Icon,
    Input
  },
  data() {
    return {
      cates: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        }
      ],
      model7: "",
      value4: "",
      columns5: [
        {
          title: "分类id",
          key: "id",
          sortable: true
        },
        {
          title: "上级分类名称",
          key: "prename"
        },
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "创建时间",
          key: "time",
          sortable: true
        }
      ],
      data5: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  }
};
</script>
<style scoped>
.ivu-btn-large {
  font-size: 25px !important;
}
.addButton {
  margin-bottom: 10px;
}
.addInput {
}
.addSelect {
  width: 150px;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 14px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
}
</style>
