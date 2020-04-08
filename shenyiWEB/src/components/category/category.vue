<template>
  <div class="category">
    <Tree
      :data="treeData"
      :render="renderContent"
      class="demo-tree-render"
    ></Tree>
  </div>
</template>
<script>
import { Tree, Button, Icon } from "view-design";
export default {
  components: {
    Tree,
    Button,
    Icon,
  },
  data() {
    return {
      treeData: [],
      editState: false,
      buttonProps: {
        type: "default",
        size: "small",
      },
      //输入框要修改的内容
      inputContent: "",
      //修改前的TreeNode名称
      oldName: "",
    };
  },
  created() {
    this.treeDataAjax();
  },
  methods: {
    treeDataAjax() {
      let that = this;
      this.$http.get("apis/web/types", {}).then((res) => {
        this.renderTree(res.data.data);
      });
    },
    renderTree(data) {
      let obj = {
        title: "分类",
        expand: true,
        isParent: true,
        children: data,
      };
      this.treeData = [obj];
    },
    renderContent(h, { root, node, data }) {
      if (data.isParent) {
        return h(
          "span",
          {
            style: {
              display: "inline-block",
              width: "100%",
            },
          },
          [
            h("span", [h("span", data.title)]),
            h(
              "span",
              {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px",
                },
              },
              [
                h(Button, {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-add",
                    type: "primary",
                  }),
                  style: {
                    width: "64px",
                  },
                  on: {
                    click: () => {
                      this.append(data);
                    },
                  },
                }),
              ]
            ),
          ]
        );
      } else if (!Object.keys(data).includes("isParent")) {
        return h(
          "span",
          {
            style: {
              display: "inline-block",
              width: "100%",
            },
          },
          [
            h("span", [h("span", data.title)]),
            h(
              "span",
              {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px",
                },
              },
              [
                h(Button, {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-add",
                  }),
                  style: {
                    marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.append(data);
                    },
                  },
                }),
                h(Button, {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-color-wand",
                  }),
                  on: {
                    click: () => {
                      this.edit(data);
                    },
                  },
                }),
              ]
            ),
            h(
              "span",
              {
                class: "hhhaha",
                style: {
                  display: "inline-block",
                  lineHeight: "1.6rem",
                  width: "100%",
                  cursor: "pointer",
                },
              },
              [
                h("span", [
                  // h(Icon, {
                  //   props: {
                  //     type: `${
                  //       data.children == undefined || data.children.length == 0
                  //         ? "md-document"
                  //         : "ios-folder"
                  //     }`,
                  //   },
                  //   style: {
                  //     marginRight: "8px",
                  //   },
                  // }),
                  // h(`${data.editState ? "" : "span"}`, data.title),
                  h(`${data.editState ? "input" : ""}`, {
                    attrs: {
                      value: `${data.editState ? data.title : ""}`,
                      autofocus: "true",
                    },
                    style: {
                      width: "12rem",
                      cursor: "auto",
                    },
                    on: {
                      change: (event) => {
                        this.inputContent = event.target.value;
                      },
                    },
                  }),
                ]),
                // 增删改按钮部分
                // h(
                //   `${data.editState ? "" : "span"}`,
                //   {
                //     class: "btnNone",
                //     style: { marginLeft: "1rem" },
                //   },
                //   [
                //     //操作按钮部分
                //     // 编辑按钮
                //     h(Button, {
                //       props: Object.assign({}, this.buttonProps, {
                //         icon: "ios-brush-outline",
                //       }),
                //       style: {
                //         marginRight: "8px",
                //         borderRadius: "50%",
                //         width: "1.5rem",
                //         lineHeight: "0",
                //         padding: "0",
                //         height: "1.4rem",
                //       },
                //       on: {
                //         click: () => {
                //           this.editTree(data);
                //         },
                //       },
                //     }),
                //     // 添加按钮
                //     h(Button, {
                //       props: Object.assign({}, this.buttonProps, {
                //         icon: "ios-add",
                //       }),
                //       style: {
                //         marginRight: "8px",
                //         borderRadius: "50%",
                //         width: "1.5rem",
                //         lineHeight: "0",
                //         padding: "0",
                //         height: "1.4rem",
                //       },
                //       on: {
                //         click: () => {
                //           this.append(data);
                //         },
                //       },
                //     }),
                //     // 删除按钮
                //     h(Button, {
                //       props: Object.assign({}, this.buttonProps, {
                //         icon: "ios-remove",
                //       }),
                //       style: {
                //         marginRight: "8px",
                //         borderRadius: "50%",
                //         width: "1.5rem",
                //         padding: "0",
                //         lineHeight: "0",
                //         height: "1.4rem",
                //       },
                //       on: {
                //         click: () => {
                //           this.remove(root, node, data);
                //         },
                //       },
                //     }),
                //   ]
                // ),
                // 确认/取消修改部分
                h(
                  `${data.editState ? "span" : ""}`,
                  {
                    style: {
                      marginLeft: ".5rem",
                    },
                  },
                  [
                    // 确认按钮
                    h(Button, {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "md-checkmark",
                      }),
                      style: {
                        // marginRight: '8px',
                        border: 0,
                        background: "rgba(0,0,0,0)",
                        fontSize: "1.3rem",
                        outline: "none",
                      },
                      on: {
                        click: (event) => {
                          this.confirmTheChange(data);
                        },
                      },
                    }),
                    // 取消按钮
                    h(Button, {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "md-close",
                      }),
                      style: {
                        border: "0",
                        background: "rgba(0,0,0,0)",
                        fontSize: "1.3rem",
                        outline: "none",
                      },
                      on: {
                        click: () => {
                          this.CancelChange(data);
                        },
                      },
                    }),
                  ]
                ),
              ]
            ),
            //确认/取消修改部分
            // h(
            //   `${data.editState ? "span" : ""}`,
            //   {
            //     style: {
            //       marginLeft: ".5rem",
            //     },
            //   },
            //   [
            //     //确认按钮
            //     h(Button, {
            //       props: Object.assign({}, this.buttonProps, {
            //         icon: "md-checkmark",
            //       }),
            //       style: {
            //         border: 0,
            //         // background: "rgba(0,0,0,0)",
            //         fontSize: "1.3rem",
            //         outline: "none",
            //       },
            //       on: {
            //         click: (event) => {
            //           this.confirmTheChange(data);
            //         },
            //       },
            //     }),
            //     //取消按钮
            //     h(Button, {
            //       props: Object.assign({}, this.buttonProps, {
            //         icon: "md-close",
            //       }),
            //       style: {
            //         border: "0",
            //         // background: "rgba(0,0,0,0)",
            //         fontSize: "1.3rem",
            //         outline: "none",
            //       },
            //       on: {
            //         click: () => {
            //           this.CancelChange(data);
            //         },
            //       },
            //     }),
            //   ]
            // ),
          ]
        );
      }
    },
    setStates(data) {
      var editState = data.editState;
      if (editState) {
        this.$set(data, "editState", false);
      } else {
        this.$set(data, "editState", true);
      }
    },
    append(data) {
      console.log("add");
      event.stopPropagation();
      const children = data.children || [];
      children.push({
        title: "新建节点",
        expand: true,
      });
      this.$set(data, "children", children);
    },
    edit(data) {
      console.log("edit");
      event.stopPropagation();
      this.inputContent = data.title;
      this.oldName = data.title;
      this.setStates(data);
    },
    //确认修改树节点
    confirmTheChange(data) {
      if (!this.inputContent) {
        this.$Notice.warning({
          title: "当前输入有误",
        });
      } else {
        if (this.oldName !== this.inputContent) {
          this.$Modal.confirm({
            title: "提示",
            content: `您确定将“${this.oldName}”重命名为“${this.inputContent}”吗？`,
            onOk: () => {
              data.title = this.inputContent;
              this.$Message.info("修改成功");
            },
            onCancel: () => {
              this.$Message.info("取消");
            },
          });
          this.setState(data);
        } else {
          this.setStates(data);
        }
      }
    },
    //取消修改树节点
    CancelChange(data) {
      this.$Notice.info({
        title: "取消修改",
      });
      this.setStates(data);
    },
  },
};
</script>
<style>
/* .hhhaha:hover{color:aqua} */
.hhhaha:hover .btnNone {
  display: inline-block;
}

.hhhaha:hover {
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
