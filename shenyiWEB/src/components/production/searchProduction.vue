<template>
  <div class="search">
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
export default {
  data() {
    return {
      tabList: [
        {
          type: "selection",
          width: 50,
          align: "center",
          fixed: "left"
        },
        {
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
        },
        {
          title: "名称",
          key: "sMingCheng"
        },
        {
          title: "标准",
          key: "sBiaoZhun"
        },
        {
          title: "规格",
          key: "sGuiGe"
        },
        {
          title: "机械性能",
          key: "sJiXieXingNeng"
        },
        {
          title: "表面处理",
          key: "sBiaoMianChuLi"
        },
        {
          title: "材质",
          key: "sCaiZhi"
        },
        {
          title: "ERP分类",
          key: "sERPFenLei"
        },
        {
          title: "ERP物料编码",
          key: "sERPWuLiaoBianMa"
        },
        {
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
        }
      ],
      showList: [],
      totalList: [],
      pageSize: 6, //每页显示多少条
      dataCount: 0, //所有数据的长度
      pid: [],
      keepPage: null,
      backPage: null,
      startRow: 1
    };
  },
  mounted() {
    this.changePage();
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
      console.log(data);
      this.$router.push({
        name: "detail",
        params: data,
        query: {
          text: this.$route.query.text,
          pId: data.pId,
          page: this.keepPage,
          from: "searchList"
        }
      });
    },
    deletePro() {
      let params = {
        pId: this.pid
      };
      console.log("删除成功", params);
      this.$http.post("/apis/productManage/delProducts", params).then(res => {
        this.$Message.info("删除成功");
        //不要直接重置表格数据，只重新请求当前页的数据
        this.changePage(this.startRow);
      });
    },
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
    },
    changePage(currentPage = 1) {
      this.$Loading.start();
      let that = this;
      that.backPage = this.$route.query.page;
      console.log("backPage", that.backPage);
      //指定当前页码 利用在删除产品那儿
      that.startRow = currentPage;
      //如果是详情回到列表记录页码 直接请求改页码的数据
      if (that.backPage) {
        currentPage = that.backPage;
        //从详情回到列表 页码也要记录下来
        that.startRow = that.backPage;
        //保存当前页码 防止某页多次点击page不保存
        that.keepPage = currentPage;
        let params = {
          text: this.$route.query.text,
          size: that.pageSize,
          current: currentPage
        };
        this.$http.get("apis/wx/search", params).then(res => {
          this.$Loading.finish();
          that.showList = res.data.data.data;
          that.dataCount = res.data.data.page.totalCount;
        });
        that.backPage = null;
        this.$route.query.page = null;
      } else {
        //正常请求
        let params = {
          text: this.$route.query.text,
          size: that.pageSize,
          current: currentPage
        };
        that.keepPage = currentPage;
        console.log("keepPage", that.keepPage);
        this.$http.get("apis/wx/search", params).then(res => {
          this.$Loading.finish();
          that.showList = res.data.data.data;
          that.dataCount = res.data.data.page.totalCount;
        });
      }
    }
  }
};
</script>
<style scoped>
.button {
  margin-top: 20px;
}
.page {
  margin-top: 10px;
}
</style>
