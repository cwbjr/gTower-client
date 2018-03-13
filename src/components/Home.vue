<template>
<div class="home">
  <div class="card container" style="width: 18rem;"
    :player="player_list" v-for="player_list in players"
    :key="player_list.id">
    <img class="card-img-top img-fluid" :src="player_list.image"
      alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ player_list.name}}</h5>
      <p class="card-text">{{ player_list.tagline}}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Level: {{ player_list.level}}</li>
      <li class="list-group-item">{{ player_list.profession }}</li>
      <li class="list-group-item">{{ player_list.origin }}</li>
    </ul>
    <div class="card-body">
      <!-- <button type="submit" class="btn btn-info">{{ btnView}}</button> -->
    </div>
  </div>
</div>
</template>

<script>
import service from '@/js/service';

export default {
  name: 'Home',
  props: ['player_list', 'player'],
  data() {
    return {
      dbURL: 'https://g-tower-server.herokuapp.com/api/player',
      players: [],
      btnView: 'View',
    };
  },
  mounted() {
    service.getPlayers()
      .then((data) => {
        this.players = data;
        return Promise.all([this.cacheOrigins(), this.cacheProfession()]);
      })
      .then(this.resolveLookups);
  },
  methods: {
    getPlayers() {
      fetch(this.dbURL)
        .then(res => res.json())
        .then((data) => {
          this.players = data;
        });
    },
    resolveLookups() {
      const {
        origins,
        professions,
      } = service;
      this.players.map((player) => {
        const origin = origins.find(o => o !== undefined && o.id === player.origin_id);
        const profession = professions.find(p => p !== undefined && p.id === player.profession_id);
        this.$set(player, 'origin', origin && origin.race);
        this.$set(player, 'profession', profession && profession.class);
        return player;
      });
    },
    cacheProfession() {
      return service.getPlayersProfession();
    },
    cacheOrigins() {
      return service.getPlayersOrigin();
    },
  },
};
</script>

<style scoped>
div.home {
  display: flex;
  flex-flow: wrap;
  padding: 40px;
}
.card.container {
  margin: 15px;
  min-width: 18rem;
}
</style>
