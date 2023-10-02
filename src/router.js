import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    name: "login",
    component: () => import("./components/LoginForm.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./components/RegisterForm.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;