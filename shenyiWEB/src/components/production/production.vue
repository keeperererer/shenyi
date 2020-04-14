<template>
  <div>
    <div class="search">
      <Input
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
import $ from "jquery";
export default {
  components: {
    Table,
    Button,
    Input,
    Page
  },
  data() {
    return {
      searchValue: "",
      showList: [],
      // totalList: [], //所有数据
      attributeAllList: [], //Attribute所有数据
      attributeList: [], //Attribute extra = 0的数据
      tabList: [],
      pageSize: 6, //每页显示多少条
      dataCount: 0, //所有数据的长度
      pid: []
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
    detailOnClick(data) {
      this.$router.push({ name: "detail", params: data });
    },
    searchPro() {
      this.$router.push({
        name: "searchProduction",
        query: { text: this.searchValue }
      });
    },
    deletePro() {
      let params = {
        pId: this.pid
      };
      this.$http.post("/apis/productManage/delProducts", params).then(res => {
        this.changePage();
      });
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
                Button,
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
    changePage(currentPage = 1) {
      this.$Loading.start();
      let that = this;
      let params = {
        size: that.pageSize,
        current: currentPage
      };
      this.$http.get("apis/wx/all", params).then(res => {
        this.$Loading.finish();
        that.showList = res.data.data.data;
        that.dataCount = res.data.data.page.totalCount;
      });
    },
    downLoad(params) {
      let down = params.row.attachUrl;
      if (down) {
        // let url = `https://codeload.github.com/douban/douban-client/legacy.zip/master`;
        let url = `https://shenyi.looyeagee.cn/uploads/${params.row.pId}/${params.row.attachUrl}`;
        var form = $("<form></form>")
          .attr("action", url)
          .attr("method", "get");
        form.append(
          $("<input></input>").attr("type", "hidden")
          // .attr("name", "Authorization")
          // .attr("value", sessionId)
        );
        form
          .appendTo("body")
          .submit()
          .remove();
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
