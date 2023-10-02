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
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./components/DashboardLayout.vue"),
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");
    if (!token) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;