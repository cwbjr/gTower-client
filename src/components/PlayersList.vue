<template>
<div class="players-list">
  <div class="container">
    <h1>Players</h1>
  </div>

  <div class="alert alert-danger">
    {{ message }}
  </div>

  <div class="card container">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Level</th>
          <th scope="col">Class</th>
          <th scope="col">Race</th>
          <th scope="col">Update</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr :player="player" v-for="player in players" :key="player.id">
          <th scope="row">{{ player.id }}</th>
          <td>{{ player.name }}</td>
          <td>{{ player.level }}</td>
          <td>{{ player.profession }}</td>
          <td>{{ player.origin }}</td>
          <td><router-link
            :to="{ name: 'UpdatePlayer', params: { id: player.id}}">
            Update
          </router-link></td>
          <td><button type="button" class="btn btn-danger"
            v-on:click="deletePlayer(player.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="button-add">
    <nav class="nav nav-pills nav-justified">
      <a class="nav-item nav-link" href="/add-player">Create Player</a>
    </nav>
  </div>

</div>
</template>

<script>
import service from '@/js/service';

export default {
  name: 'PlayersList',
  props: ['player_list', 'player'],
  data() {
    return {
      dbURL: 'https://g-tower-server.herokuapp.com/api/player',
      players: {},
      message: '',
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
    resolveLookups() {
      const { origins, professions } = service;
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
    deletePlayer(id) {
      fetch(`${this.dbURL}/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.ok)
        .then((successful) => {
          this.message = successful ? 'Deleted' : 'Not deleted!!!';
        }).then(() => {
          window.location = '/players';
        });
    },
  },
};
</script>

<style scoped>
  .card.container {
    padding: 0;
  }
  .card,
  .button-add {
    width: 50rem;
    margin: 40px auto;
  }
  .nav a {
    background-color: #72B0D6;
    color: white;
  }
  .nav a:hover {
    background-color: #0457C7;
  }
  a {
    background-color: #72B0D6;
    color: white;
    display: inline-block;
    padding: .375rem .75rem;
    border-radius: 5px;
  }
  td {
    vertical-align: inherit;
  }
  table {
    margin-bottom: 0;
  }
</style>
