<template>
  <div>
    <!-- <div class="search">
      <Input
        v-model="value4"
        placeholder="请输入产品标准号"
        style="width: 200px;"
      />
      <Button>搜索</Button>
    </div> -->
    <Table
      border
      ref="selection"
      :columns="tabList"
      :data="showList"
      @on-row-click="detailOnClick"
    >
    </Table>
    <div class="button">
      <Button type="warning">删除</Button>
      <Button @click="handleSelectAll(true)">全选</Button>
      <Button @click="handleSelectAll(false)">取消选择</Button>
    </div>
    <Page
      :total="dataCount"
      :page-size="pageSize"
      show-total
      @on-change="changePage"
      show-elevator
      class="page"
    ></Page>
  </div>
</template>
<script>
import { Table, Button, Input, Page } from "view-design";
export default {
  components: {
    Table,
    Button,
    Input,
    Page
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
          key: "seq"
        },
        {
          title: "名称",
          key: "tid"
        },
        {
          title: "标准号",
          key: "tname"
        },
        {
          title: "添加时间",
          key: "pid"
        }
      ],
      showList: [],
      totalList: [],
      attributeAllList: [], //Attribute所有数据
      attributeList: [], //Attribute extra = 0的数据
      tabList: [],
      allList: [], //all数据
      pageSize: 10, //每页显示多少条
      dataCount: 0 //所有数据的长度
    };
  },
  mounted() {
    // this.proListAjax();
    this.attributeListAjax();
    this.allListAjax();
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    detailOnClick(data) {
      this.$router.push({ name: "detail", params: data.standardNum });
    },
    attributeListAjax() {
      let that = this;
      this.$http.get("apis/web/getAttribute", {}).then(res => {
        that.attributeAllList = res.data.data;
        that.attributeAllList.forEach(item => {
          if (item.extra == 0) {
            that.attributeList.push(item);
          }
        });
        console.log(that.attributeList);
        that.attributeList.forEach(item => {
          that.tabList.push({
            title: item.sidName,
            key: item.fieldName
          });
        });

        that.tabList.unshift({
          title: "缩略图",
          key: "picUrl"
        });
        that.tabList.unshift({
          type: "selection",
          width: 50,
          align: "center",
          fixed: "left"
        });
        that.tabList.push({
          title: "操作",
          key: "down",
          width: 70,
          fixed: "right"
        });
      });
    },
    allListAjax() {
      let that = this;
      this.$http.get("apis/wx/all", {}).then(res => {
        that.totalList = res.data.data;
        that.dataCount = that.totalList.length;
        if (that.dataCount < this.pageSize) {
          that.showList = that.totalList;
        } else {
          that.showList = that.totalList.slice(0, this.pageSize);
        }
        console.log(that.totalList);
      });
    },
    // proListAjax() {
    //   let that = this;
    //   //假数据-------要改接口！！！！！！！！
    //   this.$http.get("apis/web/getAllType", {}).then(res => {
    //     console.log(res);
    //     that.totalList = res.data.data;
    //     that.dataCount = that.totalList.length;
    //     if (that.dataCount < this.pageSize) {
    //       that.showList = that.totalList;
    //     } else {
    //       that.showList = that.totalList.slice(0, this.pageSize);
    //     }
    //     console.log(res.data.data);
    //   });
    // },
    changePage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.showList = this.totalList.slice(_start, _end);
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
.page {
  margin-top: 20px;
}
</style>
