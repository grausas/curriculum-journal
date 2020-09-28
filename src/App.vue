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

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css);
@import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
</style>
