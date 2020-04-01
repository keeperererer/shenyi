<template>
  <div class="layout">
    <top></top>
    <Layout>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu
            active-name="1-2"
            theme="light"
            width="auto"
            :open-names="['1']"
          >
            <MenuItem name="1-1" to="/Category">分类管理</MenuItem>
            <MenuItem name="1-2" to="/Production">产品管理</MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 24px 24px' }">
          <Content
            :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
          >
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { Layout, Sider, Menu, MenuItem } from "view-design";
import Top from "@/components/top";
export default {
  components: {
    Top,
    Layout,
    Sider,
    Menu,
    MenuItem
  }
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
