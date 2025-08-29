import { createWebHistory, createRouter } from "vue-router";

import User from "../components/User.vue";
import UserCreate from "../components/UserCreate.vue";
import NotFound from "../components/NotFound.vue";
import UserDetails from "../components/UserDetails.vue";

const routes = [
  { path: "/", component: User },
  { path: "/userCreate", component: UserCreate },
  { path: "/user/:id", component: UserDetails },
  { path: "/:pathMatch(.*)", component: NotFound, meta: { hideNav: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
