<template>
  <div id="app">
    <Navigation />
    <div class="section">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  components: { Navigation },
};
</script>
