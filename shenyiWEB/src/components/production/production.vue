<template>
  <div>
    <div class="search">
      <Input
        v-model="value4"
        placeholder="请输入产品标准号"
        style="width: 200px;"
      />
      <Button>搜索</Button>
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
      value4: "",
      showList: [],
      totalList: [], //所有数据
      attributeAllList: [], //Attribute所有数据
      attributeList: [], //Attribute extra = 0的数据
      tabList: [],
      pageSize: 10, //每页显示多少条
      dataCount: 0, //所有数据的长度
      pid: []
    };
  },
  mounted() {
    this.attributeListAjax();
    this.allListAjax();
  },
  methods: {
    //全选按钮
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    //单选一行
    selectOneRow(row) {
      console.log(row);
      let rowData = row;
      let len = row.length;
      let arrPid = [];
      rowData.forEach(item => {
        arrPid.push(item.pId);
        // console.log(this.pid);
      });
      this.pid = [...new Set(arrPid)];
      this.pid = this.pid
        .toString()
        .split(",")
        .join(" ");
      console.log("单行pID", this.pid);
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
      console.log("表单全选pId", this.pid);
    },
    //取消全选
    cancelAllRow() {
      if (this.pid) {
        this.pid = [];
      }
      console.log("取消全选", this.pid);
    },
    //取消一行
    cancelOneRow(row) {
      // console.log("取消某一行", row);
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
      console.log("取消某一行后的pid", this.pid);
    },
    detailOnClick(data) {
      this.$router.push({ name: "detail", params: data });
    },
    deletePro() {
      let params = {
        pId: this.pid
      };
      console.log("删除成功", params);
      this.$http.post("/apis/productManage/delProducts", params).then(res => {
        console.log(res);
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
      });
    },
    changePage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.showList = this.totalList.slice(_start, _end);
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
  margin-top: 10px;
}
.page {
  margin-top: 20px;
}
</style>
