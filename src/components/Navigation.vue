<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div
        class="navbar-burger"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showNav }"
        v-if="loggedIn"
      >
        <div class="navbar-start">
          <router-link
            class="navbar-item"
            v-for="link in links"
            :key="link.url"
            :to="link.url"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button
              v-if="loggedIn"
              v-on:click="logout()"
              class="button is-light"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      showNav: false,
      loggedIn: false,

      links: [
        { name: "View Journal", url: "/viewjournal" },
        { name: "Add Group", url: "/addgroup" },
        { name: "Fill Journal", url: "/filljournal" },
        { name: "View groups", url: "/viewgroups" },
      ],
    };
  },
  methods: {
    logout() {
      this.loggedIn = false;
      firebase.auth().signOut();
    },
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.email = firebase.auth().currentUser.email;
      }
    });
  },
};
</script>

<style scoped>
.navbar-item:first-child {
  padding-left: 0;
}
@media only screen and (max-width: 1020px) {
  .navbar-link,
  a.navbar-item:first-child {
    padding-left: 10px;
  }

  .navbar > .container {
    display: flex;
    justify-content: space-between;
  }

  .navbar-burger {
    margin-left: 10px;
  }

  .navbar-end {
    margin-left: 10px;
  }

  .navbar-menu.is-active {
    width: 50%;
    margin: 0 auto;
    margin-left: 0;
    display: inline-block;
  }
}
</style>
