<template>
  <div class="layout">
    <top></top>
    <Layout>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu
            theme="light"
            width="auto"
            :open-names="openNames"
            :active-name="activeName"
          >
            <!-- <MenuItem name="1-0" to="/">管理平台</MenuItem> -->
            <MenuItem name="1-1" to="/category"
              ><Icon type="ios-bookmark" />分类管理</MenuItem
            >
            <!-- <MenuItem name="1-2" to="/Production">产品管理</MenuItem> -->
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                产品管理
              </template>
              <MenuItem name="2-1" to="/addProduction">添加产品</MenuItem>
              <MenuItem name="2-2" to="/production">查看产品</MenuItem>
              <!-- <MenuItem name="2-3" to="/searchProduction">搜索产品</MenuItem> -->
            </Submenu>
            <MenuItem name="3-1" to="/maintain"
              ><Icon type="ios-clipboard" />维护字段管理</MenuItem
            >
            <MenuItem name="3-2" to="/extra"
              ><Icon type="ios-clipboard" />附加字段管理</MenuItem
            >
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 24px 24px' }">
          <Content
            :style="{ padding: '24px', minHeight: '580px', background: '#fff' }"
          >
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { Layout, Sider, Menu, MenuItem, Submenu, Icon } from "view-design";
import Top from "@/components/top";
export default {
  components: {
    Top,
    Layout,
    Sider,
    Menu,
    MenuItem,
    Submenu,
    Icon
  },
  data() {
    return {
      openNames: [],
      activeName: ""
    };
  },
  created() {
    if (this.$route.meta && this.$route.meta.order) {
      this.activeName = this.$route.meta.order;
      this.openNames.push(this.$route.meta.order.split("-")[0]);
    }
  },
  mounted() {}
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
</style>
