// Composables
import DefaultHomeLayout from "@/layouts/default/Default.vue";
import DefaultView from "@/layouts/default/View.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";

const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    path: "/home",
    component: DefaultHomeLayout,
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: "/auth",
    component: DefaultView,
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "auth" */ "@/views/Login.vue"),
      },
      {
        path: "signup",
        name: "signup",
        component: () =>
          import(/* webpackChunkName: "auth" */ "@/views/Signup.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    if (to.matched.some((route) => route.meta.requireAuth)) {
      next({ name: "login" });
    } else {
      next();
    }
    return;
  }
  next();
});

export default router;
