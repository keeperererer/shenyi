<template>
  <div class="login">
    <div class="loginForm">
      <Form ref="users" :model="users" class="loginData">
        <h1>申亿后台管理系统</h1>
        <FormItem prop="user">
          <Input type="text" v-model="users.name" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="users.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('users')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, FormItem, Input, Icon, Button } from "view-design";
import Storage from "@/tool/storage";
export default {
  name: "Login",
  components: { Form, FormItem, Input, Icon, Button },
  data() {
    return {
      users: {
        name: "",
        password: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSubmit(name) {
      this.loginAjax();
    },
    loginAjax() {
      let params = {
        name: this.users.name.trim(),
        pwd: this.users.password.trim()
      };
      this.$http.post("/apis/web/login", params).then(res => {
        let obj = res.data.data;
        let setTime = 30 * 24 * 60 * 60 * 1000;
        Storage.setItem({
          name: "token",
          value: obj,
          expires: setTime
        });
        if (res.data.msg == "获取成功") {
          this.$Message.success("登录成功");
          this.$router.push({ path: "/" });
        } else if (!this.users.name.trim() || !this.users.password.trim()) {
          this.$Message.warning("用户名密码不能为空");
        } else if (
          this.users.name.trim() !== "admin" &&
          this.users.password.trim() !== "admin"
        ) {
          this.$Message.error("用户名或密码错误，请检查后输入");
          this.users.name = "";
          this.users.password = "";
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
h1 {
  font-weight: 300;
  margin-bottom: 30px;
}
</style>
