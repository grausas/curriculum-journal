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
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
      links: [
        { name: "View Journal", url: "/" },
        { name: "Add Group", url: "/addgroup" },
        { name: "Fill Journal", url: "/filljournal" },
        { name: "View groups", url: "/viewgroups" },
      ],
    };
  },
};
</script>

<style scoped>
.navbar-start.navbar-item:first-child {
  padding-left: 0;
}
</style>
