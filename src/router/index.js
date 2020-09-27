import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/viewjournal",
    name: "View Journal",
    component: () =>
      import(/* webpackChunkName: "viewjournal" */ "../views/ViewJournal.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/addgroup",
    name: "Add Group",
    component: () =>
      import(/* webpackChunkName: "addgroup" */ "../views/AddGroup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/viewgroups",
    name: "View Groups",
    component: () =>
      import(/* webpackChunkName: "viewgroups" */ "../views/ViewGroups.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/editgroup/:id",
    name: "Edit Group",
    component: () =>
      import(/* webpackChunkName: "editgroup" */ "../views/EditGroup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/filljournal",
    name: "Fill Journal",
    component: () =>
      import(/* webpackChunkName: "filljournal" */ "../views/FillJournal.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
      next({ path: "/login" });
    } else if (user && to.matched.some((route) => route.meta.requiresAnon)) {
      next({ path: "/viewjournal" });
    } else {
      next();
    }
  });
});

export default router;
