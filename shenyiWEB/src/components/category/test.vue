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
        <Select v-model="model7" style="width: 200px;" filterable>
          <Option :value="topCate">{{ topCate }}</Option>
          <OptionGroup label="为以下分类添加下级">
            <Option
              v-for="(item, index) in downList"
              :value="item.value"
              :key="index"
              >{{ item.label }}</Option
            >
          </OptionGroup>
        </Select>
        <Input
          v-model="value4"
          placeholder="请输入分类名..."
          style="width: 200px;"
        />
        <Button>添加</Button>
      </div>
    </transition>
    <Table border :columns="columns5" :data="showList"></Table>
    <Page
      :total="dataCount"
      :page-size="pageSize"
      show-total
      @on-change="changePage"
      show-elevator
    ></Page>
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
  Option,
  Page,
} from "view-design";

export default {
  components: {
    Button,
    Table,
    Icon,
    Input,
    Select,
    OptionGroup,
    Option,
    Page,
  },
  data() {
    return {
      show: false,
      totalList: [],
      dataCount: 0, //所有数据的长度
      pageSize: 10, //每页显示多少条
      downList: [],
      model7: "",
      value4: "",
      topCate: "顶级分类",
      columns5: [
        {
          title: "分类id",
          key: "seq",
          sortable: true,
        },
        {
          title: "上级分类名称",
          key: "tid",
        },
        {
          title: "分类名称",
          key: "tname",
        },
        {
          title: "创建时间",
          key: "pid",
          sortable: true,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                Button,
                {
                  props: {
                    type: "primary",
                  },
                  on: {
                    click: () => {
                      console.log("修改");
                    },
                  },
                },
                "修改"
              ),
            ]);
          },
        },
      ],
      showList: [],
    };
  },
  mounted() {
    this.cateListAjax();
  },
  methods: {
    cateListAjax() {
      let that = this;
      this.$http.get("apis/web/getAllType", {}).then((res) => {
        that.totalList = res.data.data;
        that.dataCount = that.totalList.length;
        if (that.dataCount < this.pageSize) {
          that.showList = that.totalList;
        } else {
          that.showList = that.totalList.slice(0, this.pageSize);
        }
        console.log(res.data.data);
      });
    },
    changePage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.showList = this.totalList.slice(_start, _end);
    },
  },
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
