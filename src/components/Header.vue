<template>
  <div class="header">
    <nav class="navbar sticky-top navbar-light bg-light">
      <router-link class="nav-link" :to="{ name: 'Home'}">
        Campaign Chat
      </router-link>
      <router-link class="nav-link" :to="{ name: 'Home'}">
        Home
      </router-link>
      <router-link class="nav-link" :to="{ name: 'PlayersList'}">
        Players
      </router-link>
      <router-link class="nav-link" :to="{ name: 'PolarChart'}">
        Chart
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.navbar {
  justify-content: flex-start;
}
</style>
