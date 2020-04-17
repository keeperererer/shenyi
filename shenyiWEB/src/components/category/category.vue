<template>
  <div class="category">
    <div style="color:#ccc">点击添加即为添加其子分类</div>
    <Tree
      :data="treeData"
      :render="renderContent"
      class="demo-tree-render"
    ></Tree>
  </div>
</template>
<script>
// import { Tree, Button, Icon } from "view-design";
export default {
  // components: {
  //   Tree,
  //   Button,
  //   Icon
  // },
  data() {
    return {
      treeData: [],
      //修改状态，是否修改
      editState: false,
      //添加状态，是否添加
      addState: false,
      buttonProps: {
        type: "default",
        size: "small"
      },
      //输入框要修改的内容
      inputContent: "",
      //添加框要添加的内容
      addInputContent: "",
      //修改前的TreeNode名称
      oldName: ""
    };
  },
  created() {
    this.treeDataAjax();
  },
  methods: {
    //请求数据
    treeDataAjax() {
      this.$Loading.start();
      let that = this;
      this.$http.get("apis/web/types", {}).then(res => {
        this.$Loading.finish();
        this.renderTree(res.data.data);
      });
    },
    //处理数据
    renderTree(data) {
      let obj = {
        title: "分类",
        expand: true,
        isParent: true,
        children: data
      };
      this.treeData = [obj];
      this.treeExpand(this.treeData);
    },
    //由于第二级节点没有expand不可展开，于是添加此函数增加expand属性
    treeExpand(data) {
      for (const i of data) {
        this.$set(i, "expand", true);
        if (i.children) {
          i.children = this.treeExpand(i.children);
        }
      }
      return data;
    },
    //渲染树结构
    renderContent(h, { root, node, data }) {
      //判断是否为顶级节点
      if (data.isParent) {
        return h(
          "span",
          {
            style: {
              display: "inline-block",
              width: "100%"
            }
          },
          [
            h("span", [h("span", data.title)]),
            h(
              "span",
              {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                }
              },
              [
                h(
                  "Button",
                  {
                    props: Object.assign({}, this.buttonProps, {
                      icon: "ios-add",
                      type: "primary"
                    }),
                    style: {
                      width: "148px",
                      height: "30px"
                    },
                    on: {
                      click: () => {
                        this.append(data);
                      }
                    }
                  },
                  "添加"
                )
              ]
            )
          ]
        );
      } else if (!Object.keys(data).includes("isParent")) {
        return h(
          "span",
          {
            style: {
              display: "inline-block",
              width: "100%"
            }
          },
          [
            h("span", [h("span", data.title)]),
            h(
              "span",
              {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                }
              },
              [
                h(
                  "Button",
                  {
                    props: Object.assign({}, this.buttonProps, {
                      icon: "ios-add"
                    }),
                    style: {
                      marginRight: "8px",
                      width: "70px",
                      height: "30px"
                    },
                    on: {
                      click: () => {
                        this.append(data);
                      }
                    }
                  },
                  "添加"
                ),
                h(
                  "Button",
                  {
                    props: Object.assign({}, this.buttonProps, {
                      icon: "ios-color-wand"
                    }),
                    style: {
                      width: "70px",
                      height: "30px"
                    },
                    on: {
                      click: () => {
                        this.edit(data);
                      }
                    }
                  },
                  "修改"
                )
              ]
            ),
            //修改时出现的修改框
            h(
              "div",
              {
                class: "editDiv"
              },
              [
                h("span", [
                  h(`${data.editState ? "input" : ""}`, {
                    attrs: {
                      value: `${data.editState ? data.title : ""}`,
                      autofocus: "true"
                    },
                    style: {
                      width: "12rem",
                      cursor: "auto",
                      borderRadius: "5px",
                      outline: "none",
                      border: "1px #ccc solid"
                    },
                    on: {
                      change: event => {
                        this.inputContent = event.target.value;
                      }
                    }
                  })
                ]),
                h(
                  `${data.editState ? "span" : ""}`,
                  {
                    style: {
                      marginLeft: ".5rem",
                      height: "27px",
                      display: "inline-block"
                    }
                  },
                  [
                    // 确认按钮
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "md-checkmark"
                      }),
                      style: {
                        border: 0,
                        background: "rgba(0,0,0,0)",
                        fontSize: "1.3rem",
                        outline: "none",
                        height: "27px",
                        lineHeight: "27px"
                      },
                      on: {
                        click: event => {
                          this.confirmTheChange(data);
                        }
                      }
                    }),
                    // 取消按钮
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "md-close"
                      }),
                      style: {
                        border: "0",
                        background: "rgba(0,0,0,0)",
                        fontSize: "1.3rem",
                        outline: "none",
                        height: "27px",
                        lineHeight: "27px"
                      },
                      on: {
                        click: () => {
                          this.CancelChange(data);
                        }
                      }
                    })
                  ]
                )
              ]
            )
            //修改框结束
          ]
        );
      }
    },
    //更改修改状态
    setStates(data) {
      console.log(data);
      var editState = data.editState;
      console.log("editState", editState);
      if (editState) {
        this.$set(data, "editState", false);
      } else {
        this.$set(data, "editState", true);
      }
    },
    //更改添加状态
    setAddStates(data) {
      console.log(data);
      var addState = data.addState;
      console.log("addState", addState);
      if (addState) {
        this.$set(data, "addState", false);
      } else {
        this.$set(data, "addState", true);
      }
    },
    //添加节点
    append(parentdata) {
      event.stopPropagation();
      const children = parentdata.children || [];
      this.setAddStates(parentdata);
      console.log("append", parentdata.addState);
      console.log("addInputContent", this.addInputContent);
      children.push({
        title: this.addInputContent,
        expand: true,
        addState: parentdata.addState,
        render: (h, { root, node, data }) => {
          return h(
            "div",
            {
              class: "addDiv"
            },
            [
              h("span", [
                h(`${parentdata.addState ? "input" : ""}`, {
                  attrs: {
                    value: `${parentdata.addState ? parentdata.title : ""}`,
                    autofocus: "true"
                  },
                  style: {
                    width: "12rem",
                    cursor: "auto",
                    borderRadius: "5px",
                    outline: "none",
                    border: "1px #ccc solid"
                  },
                  on: {
                    change: event => {
                      this.addInputContent = event.target.value;
                    }
                  }
                })
              ]),
              h(
                `${parentdata.addState ? "span" : ""}`,
                {
                  style: {
                    marginLeft: ".5rem",
                    height: "27px",
                    display: "inline-block"
                  }
                },
                [
                  // 确认按钮
                  h("Button", {
                    props: Object.assign({}, this.buttonProps, {
                      icon: "md-checkmark"
                    }),
                    style: {
                      // marginRight: '8px',
                      border: 0,
                      background: "rgba(0,0,0,0)",
                      fontSize: "1.3rem",
                      outline: "none",
                      height: "27px",
                      lineHeight: "27px"
                    },
                    on: {
                      click: event => {
                        console.log("确认添加");
                        this.confirmAdd(parentdata, data);
                      }
                    }
                  }),
                  // 取消按钮
                  h("Button", {
                    props: Object.assign({}, this.buttonProps, {
                      icon: "md-close"
                    }),
                    style: {
                      border: "0",
                      background: "rgba(0,0,0,0)",
                      fontSize: "1.3rem",
                      outline: "none",
                      height: "27px",
                      lineHeight: "27px"
                    },
                    on: {
                      click: () => {
                        console.log("取消添加");
                        this.cancelAdd(parentdata);
                      }
                    }
                  })
                ]
              )
            ]
          );
        }
      });
      this.$set(parentdata, "children", children);
      console.log("appendData", parentdata);
    },
    //修改节点内容
    edit(data) {
      console.log("edit");
      event.stopPropagation();
      this.inputContent = data.title;
      this.oldName = data.title;
      this.setStates(data);
    },
    //确认修改节点
    confirmTheChange(data) {
      if (!this.inputContent.trim()) {
        this.$Notice.warning({
          title: "输入不能为空"
        });
      } else {
        if (this.oldName !== this.inputContent) {
          this.$Modal.confirm({
            title: "提示",
            content: `您确定将“${this.oldName}”重命名为“${this.inputContent}”吗？`,
            onOk: () => {
              data.title = this.inputContent;
              this.$Message.info("修改成功");
              this.editAjax(data);
            },
            onCancel: () => {
              this.$Message.info("取消修改");
            }
          });
          this.setStates(data);
        } else {
          this.setStates(data);
        }
      }
    },
    //取消修改树节点
    CancelChange(data) {
      this.$Notice.info({
        title: "取消修改"
      });
      this.setStates(data);
    },
    //确认添加子节点
    confirmAdd(parentdata, data) {
      this.$Message.info("添加成功");
      console.log("confirmAddParentData", parentdata);
      console.log("confirmAddData", data);
      console.log("addInputContent", this.addInputContent);
      this.appendAjax(parentdata);
    },
    //取消添加子节点
    cancelAdd(parentdata) {
      this.$Notice.info({
        title: "取消添加"
      });
      this.treeDataAjax();
      this.setAddStates(parentdata);
    },
    //添加节点的前后交互
    appendAjax(parentdata) {
      let that = this;
      console.log("add---", parentdata);
      if (parentdata.value == undefined) {
        parentdata.value = 0;
      }
      let params = {
        pId: parentdata.value,
        tName: that.addInputContent
      };
      console.log(params);

      this.$http.get("/apis/web/insertType", params).then(res => {
        console.log(res);
        //添加的时候重新获取一下数据
        this.treeDataAjax();
      });
    },
    //编辑节点的前端交互
    editAjax(data) {
      console.log("edit---", data);
      if (data.value == undefined) {
        data.value = 0;
      }
      let params = {
        tId: data.value,
        tName: data.title
      };
      console.log(params);
      this.$http.get("/apis/web/updateType", params).then(res => {
        this.treeDataAjax();
      });
    }
  }
};
</script>
<style>
.editDiv:hover .btnNone {
  display: inline-block;
}

.editDiv:hover {
  font-weight: 600;
  color: #275cd4;
}
.ivu-tree ul li {
  list-style: none;
  /* margin: 8px 0; */
  padding: 0;
  white-space: nowrap;
  outline: none;
}
</style>
