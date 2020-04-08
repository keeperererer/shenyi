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
import Storage from "@/tool/storage";
export default {
  name: "Login",
  components: { Form, FormItem, Input, Icon, Button },
  data() {
    return {
      users: {
        name: "",
        password: "",
      },
    };
  },
  created() {},
  mounted() {
    // console.log(Storage.getItem("token"));
    // let storage = new Storage();
    // console.log(Storage);
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
      // this.$http.post("/apis/web/login", params).then((res) => {
      //   let obj = res.data.data;
      //   // let setTime = 30*24*60*60*1000//过期时间30天
      //   localStorage.setItem("token", obj);
      //   // localStorage.setItem("tokenTime", +new Date());
      //   if (res.status == 200) {
      //     this.$router.push({ path: "/" });
      //   }
      // });
      this.$http.post("/apis/web/login", params).then((res) => {
        let obj = res.data.data;
        let setTime = 30 * 24 * 60 * 60 * 1000;
        Storage.setItem({
          name: "token",
          value: obj,
          expires: setTime,
        });
        if (res.status == 200) {
          this.$router.push({ path: "/" });
        }
        // let value = Storage.getItem("token");
        // console.log(value);
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
