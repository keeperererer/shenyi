import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/index";
import Login from "@/components/user/login";
import Category from "@/components/category/category";
import Production from "@/components/production/production";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      children: [
        {
          path: "Category",
          name: "Category",
          component: Category
        },
        {
          path: "Production",
          name: "Production",
          component: Production
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
