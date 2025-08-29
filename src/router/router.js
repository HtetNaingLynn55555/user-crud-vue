import { createWebHistory, createRouter } from "vue-router";

import User from "../components/User.vue";
import UserCreate from "../components/UserCreate.vue";

const routes = [
  { path: "/", component: User },
  //   { path: "/about", component: AboutView },
  { path: "/userCreate", component: UserCreate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
