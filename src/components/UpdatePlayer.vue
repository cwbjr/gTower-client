<template>
<div class="update-player">
  <main class="container">
    <div class="alert alert-danger" role="alert" id="message">{{ message }}
    </div>
    <form @submit.prevent="updatePlayers">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control"
          name="name" id="name" placeholder="Enter Name" v-model="player.name">
      </div>
      <div class="form-group">
        <label for="tagline">Tagline</label>
        <textarea type="text" class="form-control"
          name="tagline" id="tagline" placeholder="Enter a Tagline" v-model="player.tagline">
        </textarea>
      </div>
      <div class="form-group">
        <label for="level">Level</label>
        <input type="Number" class="form-control"
          name="level" id="level" placeholder="Enter a Profession" v-model="player.level">
      </div>
      <div class="form-group">
        <label for="profession">Select Profession</label>
        <select class="form-control" id="profession"
          name="profession" v-model="player.profession_id">
          <option :profession="profession"
            v-for="profession in playersProfession"
            :key="profession.id"
            :value="profession.id">
              {{ profession.class }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="race">Select Origin</label>
        <select class="form-control" id="race" name="race"
          v-model="player.origin_id">
          <option :origin="origin" v-for="origin in playersOrigin"
            :key="origin.id"
            :value="origin.id">
              {{ origin.race }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="url" class="form-control" name="image" id="image" placeholder="http://yourImage.com/image.png" v-model="player.image">
      </div>
      <div class="card-body">
        <button type="submit" class="btn btn-warning"
          v-on:click="updatePlayers(player.id)">Update Player
        </button>
      </div>
    </form>
  </main>
</div>
</template>

<script>
export default {
  name: 'UpdatePlayer',
  props: ['origin', 'profession'],
  data() {
    return {
      db_origin_URL: 'https://g-tower-server.herokuapp.com/api/origin',
      db_profession_URL: 'https://g-tower-server.herokuapp.com/api/profession',
      dbURL: 'https://g-tower-server.herokuapp.com/api/player',
      playersOrigin: [],
      playersProfession: [],
      players: [],
      player: {},
      message: '',
    };
  },
  mounted() {
    this.getPlayersOrigin();
    this.getPlayersProfession();
    this.getPlayers(this.$route.params.id);
  },
  methods: {
    getPlayersOrigin() {
      fetch(this.db_origin_URL)
        .then(res => res.json())
        .then((data) => {
          this.playersOrigin = data;
        });
    },
    getPlayersProfession() {
      fetch(this.db_profession_URL)
        .then(res => res.json())
        .then((data) => {
          this.playersProfession = data;
        });
    },
    getPlayers(id) {
      fetch(`${this.dbURL}/${id}`)
        .then(res => res.json())
        .then((data) => {
          this.player = data;
        });
    },
    updatePlayers() {
      fetch(`${this.dbURL}/${this.player.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(this.player),
      })
        .then(res => res.json())
        .then((successful) => {
          this.message = successful ? 'Updated' : 'Not Updated!!!';
        }).then(() => {
          window.location = '/players';
        });
    },
  },
};
</script>

<style scoped>
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
</style>
