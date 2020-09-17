import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/addgroup",
    name: "Add Group",
    component: () =>
      import(/* webpackChunkName: "addgroup" */ "../views/AddGroup.vue"),
  },
  {
    path: "/filljournal",
    name: "Fill Journal",
    component: () =>
      import(/* webpackChunkName: "filljournal" */ "../views/FillJournal.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
