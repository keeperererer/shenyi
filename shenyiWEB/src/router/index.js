import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/index";
import Login from "@/components/user/login";
import Category from "@/components/category/category";
import Production from "@/components/production/production";
import addProduction from "@/components/production/addProduction";
import detail from "@/components/production/productionDetail";
import Extra from "@/components/extra/extra";
import Home from "@/components/home";
import error from "@/components/error";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      // name: "Index",
      component: Index,
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
        },
        {
          path: "category",
          name: "Category",
          component: Category,
          meta: {
            order: "1-1",
          },
        },
        {
          path: "extra",
          name: "Extra",
          component: Extra,
          meta: {
            order: "3-1",
          },
        },
        {
          path: "production",
          name: "Production",
          component: Production,
          meta: {
            order: "2-2",
          },
        },
        {
          path: "addProduction",
          name: "addProduction",
          component: addProduction,
          meta: {
            order: "2-1",
          },
        },
        {
          path: "production/detail",
          name: "detail",
          component: detail,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "*",
      component: error,
    },
  ],
});
