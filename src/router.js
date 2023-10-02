import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    name: "login",
    component: () => import("./components/Auth/LoginForm.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./components/Auth/RegisterForm.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./components/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path : "projects",
        name : "projects",
        component : () => import("./components/Projects/ListProjects.vue"),
      },
    ],
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