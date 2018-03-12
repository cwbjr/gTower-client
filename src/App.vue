<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/components/Home';
import PlayersList from '@/components/PlayersList';
import AddPlayer from '@/components/AddPlayer';
// import VueChart from 'vue-chart-js';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Home,
    PlayersList,
    AddPlayer,
    // VueChart,
  },
  props: ['player_list'],
  data() {
    return {
      dbURL: 'http://localhost:3000/api/player',
      players: [],
    };
  },
  mounted() {
    this.getPlayers();
  },
  methods: {
    getPlayers() {
      fetch(this.dbURL)
        .then(res => res.json())
        .then((data) => {
          this.players = data;
        });
    },
  },
};
</script>

<style>

</style>
