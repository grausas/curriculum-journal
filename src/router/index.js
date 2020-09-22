import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/viewjournal",
    name: "View Journal",
    component: () =>
      import(/* webpackChunkName: "viewjournal" */ "../views/ViewJournal.vue"),
  },
  {
    path: "/addgroup",
    name: "Add Group",
    component: () =>
      import(/* webpackChunkName: "addgroup" */ "../views/AddGroup.vue"),
  },
  {
    path: "/viewgroups",
    name: "View Groups",
    component: () =>
      import(/* webpackChunkName: "viewgroups" */ "../views/ViewGroups.vue"),
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
