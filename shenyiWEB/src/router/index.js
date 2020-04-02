import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/index";
import Login from "@/components/user/login";
import Category from "@/components/category/category";
import Production from "@/components/production/production";
import addProduction from "@/components/production/addProduction";
import Home from "@/components/home";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      children: [
        {
          path: "",
          name: "Home",
          component: Home
        },
        {
          path: "Category",
          name: "Category",
          component: Category
        },
        {
          path: "Production",
          name: "Production",
          component: Production
        },
        {
          path: "addProduction",
          name: "addProduction",
          component: addProduction
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
