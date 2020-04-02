<template>
  <div class="cate">
    <Button
      size="large"
      icon="ios-add"
      shape="circle"
      class="addButton"
      @click="show = !show"
    ></Button>
    <transition name="slide-fade">
      <div class="addInput" v-show="show">
        <Select v-model="model7" style="width:200px" filterable>
          <Option :value="topCate">{{ topCate }}</Option>
          <OptionGroup label="为以下分类添加下级">
            <Option
              v-for="item in cates"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </OptionGroup>
        </Select>
        <Input
          v-model="value4"
          placeholder="请输入分类名..."
          style="width: 200px"
        />
        <Button>添加</Button>
      </div>
    </transition>
    <Table border :columns="columns5" :data="data5"></Table>
  </div>
</template>
<script>
import {
  Button,
  Table,
  Icon,
  Input,
  Select,
  OptionGroup,
  Option
} from "view-design";

export default {
  components: {
    Button,
    Table,
    Icon,
    Input,
    Select,
    OptionGroup,
    Option
  },
  data() {
    return {
      show: false,
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
      topCate: "顶级分类",
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
  },
  methods: {}
};
</script>
<style scoped>
.cate {
  position: relative;
}
.ivu-btn-large {
  font-size: 25px !important;
}
.addButton {
  margin-bottom: 10px;
}
.addInput {
  position: absolute;
  top: 5px;
  left: 50px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
