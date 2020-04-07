<template>
  <div class="login">
    <Form ref="users" :model="users">
      <FormItem prop="user">
        <Input type="text" v-model="users.name" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="users.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('users')">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { Form, FormItem, Input, Icon, Button } from "view-design";
export default {
  name: "Login",
  components: { Form, FormItem, Input, Icon, Button },
  data() {
    return {
      users: {
        name: "",
        password: "",
      },
      // ruleInline: {
      //   user: [
      //     {
      //       required: true,
      //       type: "string",
      //       message: "Please fill in the user name",
      //       trigger: "blur",
      //     },
      //   ],
      //   password: [
      //     {
      //       required: true,
      //       message: "Please fill in the password.",
      //       trigger: "blur",
      //     },
      //   ],
      // },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
      this.loginAjax();
    },
    loginAjax() {
      let params = {
        name: this.users.name.trim(),
        pwd: this.users.password.trim(),
      };
      this.$http.post("/apis/web/login", params).then((res) => {
        let obj = res.data.data;
        localStorage.setItem("token", obj);
        if (res.status == 200) {
          this.$router.push({ path: "/" });
        }
      });
    },
  },
};
</script>
<style scoped>
.login {
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
