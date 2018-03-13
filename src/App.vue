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

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Home,
    PlayersList,
    AddPlayer,
  },
  props: ['player_list'],
  data() {
    return {
      dbURL: 'https://g-tower-server.herokuapp.com/api/player',
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
