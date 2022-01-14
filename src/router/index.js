import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Notice from "../views/Notice.vue";
import Article from "../views/Article.vue";
import JoinEvent from "../views/Event/Join.vue";
import EventList from "../views/Event/List.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registry",
    name: "Registry",
    component: Login,
  },
  {
    path: "/notice/:page",
    name: "Notice",
    component: Notice,
  },
  {
    path: "/article/:board/:idx",
    name: "Article",
    component: Article,
  },
  {
    path: "/event/join/:idx",
    name: "JoinEvent",
    component: JoinEvent,
  },
  {
    path: "/event",
    name: "EventList",
    component: EventList,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
