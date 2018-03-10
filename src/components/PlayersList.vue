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
          <th scope="col">name</th>
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
          <td value="profession_id">{{ player.profession_id }}</td>
          <td>{{ player.origin }}</td>
          <!-- <td><button type="submit" class="btn btn-info">Update</button></td> -->
          <td><a class="nav-item nav-link" href="/update-player">Update</a></td>
          <!-- <td><button type="submit" class="btn btn-info">Delete</button></td> -->
          <td><a class="nav-item nav-link" href="" v-on:click="deletePlayer(player.id)">Delete</a></td>

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
import service from '@/js/service'
export default {
  name: 'PlayersList',
  props: ['player_list', 'player'],
  // props: {
  //   player_list: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    return {
      dbURL: 'http://localhost:3000/api/player',
      players: {},
      message: '',
    };
  },
  mounted() {
    service.getPlayers()
    .then(data => {
      this.players = data;
      return Promise.all([this.cacheOrigins(), this.cacheProfession()])
    })
    .then(this.resolveLookups)
  },
  methods: {
    resolveLookups() {
      const {origins, professions} = service;
      // console.log('origins', origins);
      const players = this.players.map(player => {
        const origin = origins.find(o => {
          // console.log('origin', o.race, 'player', player.origin_id);
          return o != undefined && o.id === player.origin_id
        });
        // const origin = origins.find(o => {
        // //   console.log('origin', o.race, 'player', player.origin_id);
        //   return o != undefined && o.id === player.origin_id
        // });
        this.$set(player, 'origin', origin && origin.race || 'WTF');
        // this.$set(player, 'profession', origin && origin.race || 'WTF');
        return player;
      });
      // this.$set(this, 'players', players);
      console.log('this.players', this.players);

    },
    cacheProfession() {
      return service.getPlayersProfession()
      // .then(professions => {
      //   this.professions = professions
      //   console.log('professions', professions);
      // })
    },
    cacheOrigins() {
      return service.getPlayersOrigin()
      // .then(origins => {
      //   this.origins = origins
      //   console.log('origins', origins);
      // })
    },
    deletePlayer(id) {
      fetch(this.dbURL + '/' + id, {method: 'DELETE'})
        .then(res => res.ok)
        .then(successful => {
          this.message = successful ? 'Deleted' : 'Not deleted!!!'
          // console.log(data);
        });
    },
  },
};
</script>

<style scoped>
.card.container {
  padding: 0;
}
.card, .button-add {
  width: 50rem;
  margin: 40px auto;
}
.nav a {
  background-color: #72B0D6;
  color: white;
}
.nav a:hover {
  background-color:  #0457C7;
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
