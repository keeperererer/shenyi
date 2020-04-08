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
      deleteBoxShow: false,
      createNodeShow: false,
      nodeId: "",
      nodeName: "",
      nodeData: {},
      nodeRoot: [],
      nodeDetail: {},
      treeNode: [],
      pidWrap: [],
      pid: "",
      removeId: "",
      treeData: null,
    };
  },
  computed: {},
  mounted() {
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
      console.log(JSON.stringify(data))
      let obj = {
        title: "parent 1",
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
                    marginRight: "8px",
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
                    icon: "ios-remove",
                  }),
                  on: {
                    click: () => {
                      this.remove(root, node, data);
                    },
                  },
                }),
              ]
            ),
          ]
        );
      }
    },
  },
};
</script>
<style scoped></style>
