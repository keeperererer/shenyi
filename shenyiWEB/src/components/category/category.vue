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
          ]
        );
      }
    },
    append(data) {
      console.log("add");
    },
    edit(data) {
      console.log("edit");
    },
  },
};
</script>
<style scoped></style>
