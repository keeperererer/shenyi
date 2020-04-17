<template>
  <div>
    <div class="search">
      <Input
        @keyup.enter.native="searchPro"
        v-model="searchValue"
        placeholder="多字段以空格隔开..."
        style="width: 200px;"
      />
      <Button @click="searchPro">搜索</Button>
    </div>
    <Table
      border
      ref="selection"
      :columns="tabList"
      :data="showList"
      @on-row-click="detailOnClick"
      @on-select="selectOneRow"
      @on-select-all="selectAllRow"
      @on-select-cancel="cancelOneRow"
      @on-select-all-cancel="cancelAllRow"
    >
    </Table>
    <div class="button">
      <Button type="warning" @click="deletePro">删除</Button>
      <Button @click="handleSelectAll(true)">全选</Button>
      <Button @click="handleSelectAll(false)">取消选择</Button>
    </div>
    <Page
      :current="startRow"
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
// import { Table, Button, Input, Page } from "view-design";
export default {
  // components: {
  //   Table,
  //   Button,
  //   Input,
  //   Page
  // },
  data() {
    return {
      //输入框的内容
      searchValue: "",
      //表格内容
      showList: [],
      //Attribute所有数据
      attributeAllList: [],
      //Attribute extra = 0的数据
      attributeList: [],
      //表头内容
      tabList: [],
      //每页显示多少条
      pageSize: 6,
      //一共有多少数据
      dataCount: 0,
      //产品id 用于记录删除哪些产品
      pid: [],
      //从列表页保存页码到详情页
      keepPage: null,
      //从详情页到列表页将页码取出来
      backPage: null,
      //保存现在操作的页码
      startRow: 1
    };
  },
  mounted() {
    this.attributeListAjax();
    this.changePage();
  },
  methods: {
    //全选按钮
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    //单选一行
    selectOneRow(row) {
      let rowData = row;
      let len = row.length;
      let arrPid = [];
      rowData.forEach(item => {
        arrPid.push(item.pId);
      });
      this.pid = [...new Set(arrPid)];
      this.pid = this.pid
        .toString()
        .split(",")
        .join(" ");
    },
    //表单全选
    selectAllRow() {
      let selectData = this.$refs.selection.data;

      if (this.pid) {
        this.pid = [];
      }
      selectData.forEach(item => {
        this.pid.push(item.pId);
      });
      this.pid = this.pid
        .toString()
        .split(",")
        .join(" ");
    },
    //取消全选
    cancelAllRow() {
      if (this.pid) {
        this.pid = [];
      }
    },
    //取消一行
    cancelOneRow(row) {
      if (this.pid) {
        this.pid = [];
      }
      row.forEach(item => {
        this.pid.push(item.pId);
      });
      this.pid = this.pid
        .toString()
        .split(",")
        .join(" ");
    },
    //进入详情页
    detailOnClick(data) {
      console.log(data);
      this.$router.push({
        name: "detail",
        params: data,
        query: { pId: data.pId, page: this.keepPage, from: "list" }
      });
    },
    //搜索产品 进入搜索结果页面
    searchPro() {
      this.$router.push({
        name: "searchProduction",
        query: { text: this.searchValue }
      });
    },
    //删除产品
    deletePro() {
      let params = {
        pId: this.pid
      };
      this.$http.post("/apis/productManage/delProducts", params).then(res => {
        this.$Message.info("删除成功");
        //不要直接重置表格数据，只重新请求当前页的数据 不然会出现页码跟内容不统一的情况
        this.changePage(this.startRow);
      });
    },
    //获取表头内容
    attributeListAjax() {
      let that = this;
      this.$http.get("apis/web/getAttribute", {}).then(res => {
        that.attributeAllList = res.data.data;
        that.attributeAllList.forEach(item => {
          if (item.extra == 0) {
            that.attributeList.push(item);
          }
        });
        that.attributeList.forEach(item => {
          that.tabList.push({
            title: item.sidName,
            key: item.fieldName
          });
        });

        that.tabList.unshift({
          title: "缩略图",
          key: "picUrl",
          render: (h, params) => {
            let url = `https://shenyi.looyeagee.cn/uploads/${params.row.pId}/${params.row.picUrl[0]}`;
            return h("img", {
              attrs: {
                src: url
              },
              style: {
                width: "100px"
              }
            });
          }
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
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      event.stopPropagation();
                      this.downLoad(params);
                    }
                  }
                },
                "下载"
              )
            ]);
          }
        });
      });
    },
    //获取表格内容
    changePage(currentPage = 1) {
      this.$Loading.start();
      let that = this;
      that.backPage = this.$route.query.page;
      console.log("backPage", that.backPage);
      //指定当前页码 利用在删除产品那儿
      that.startRow = currentPage;
      //如果是详情回到列表记录页码 直接请求该页码的数据
      if (that.backPage) {
        currentPage = that.backPage;
        //从详情回到列表 页码也要记录下来 不然会出现页码跟内容不统一的情况
        that.startRow = that.backPage;
        //保存当前页码 防止某页多次点击page不保存
        that.keepPage = currentPage;
        let params = {
          size: that.pageSize,
          current: currentPage
        };
        this.$http.get("apis/wx/all", params).then(res => {
          this.$Loading.finish();
          that.showList = res.data.data.data;
          that.dataCount = res.data.data.page.totalCount;
        });
        that.backPage = null;
        this.$route.query.page = null;
      } else {
        //正常流请求数据
        let params = {
          size: that.pageSize,
          current: currentPage
        };
        that.keepPage = currentPage;
        console.log("keepPage", that.keepPage);
        this.$http.get("apis/wx/all", params).then(res => {
          this.$Loading.finish();
          that.showList = res.data.data.data;
          that.dataCount = res.data.data.page.totalCount;
        });
      }
    },
    //下载文件 pdf文件浏览器会默认打开 不是问题
    downLoad(params) {
      let down = params.row.attachUrl;
      if (down) {
        let a = document.createElement("a");
        a.href = `https://shenyi.looyeagee.cn/uploads/${params.row.pId}/${params.row.attachUrl}`;
        a.download = "w3logo";
        a.click();
      } else {
        this.$Message.info("没有附件提供下载");
      }
    }
  }
};
</script>
<style scoped>
.search {
  margin-bottom: 10px;
}
.button {
  margin-top: 20px;
}
.page {
  margin-top: 10px;
}
</style>
