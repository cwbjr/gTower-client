<template>
<div class="add-player">
  <main class="container">
    <div class="alert alert-danger" role="alert" id="errorMsg">
    </div>
    <form @submit.prevent="addPlayers">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control"
          name="name" id="name" placeholder="Enter Name"
          v-model="player.name">
      </div>
      <div class="form-group">
        <label for="tagline">Tagline</label>
        <textarea type="text" class="form-control" name="tagline"
          id="tagline" placeholder="Enter a Tagline" v-model="player.tagline">
        </textarea>
      </div>
      <div class="form-group">
        <label for="level">Level</label>
        <input type="Number" class="form-control" name="level"
          id="level" placeholder="Enter Level" v-model="player.level">
      </div>
      <div class="form-group">
        <label for="profession">Select Profession</label>
        <select class="form-control" id="profession" name="profession"
          v-model="player.profession_id">
          <option :pro="pro"
            v-for="pro in playersProfession"
            :key="pro.id"
            :value="pro.id">
              {{ pro.class }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="race">Select Origin</label>
        <select class="form-control" id="race" name="race" v-model="player.origin_id">
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
        <button type="submit" class="btn btn-info">Add Player</button>
      </div>
    </form>
  </main>
</div>
</template>

<script>
export default {
  name: 'AddPlayer',
  props: ['origin', 'profession'],
  data() {
    return {
      db_origin_URL: 'https://g-tower-server.herokuapp.com/api/origin',
      db_profession_URL: 'https://g-tower-server.herokuapp.com/api/profession',
      dbURL: 'https://g-tower-server.herokuapp.com/api/player',
      playersOrigin: [],
      playersProfession: [],
      players: [],
      btnAdd: 'Add Player',
      player: {},
    };
  },
  mounted() {
    this.getPlayersOrigin();
    this.getPlayersProfession();
    this.getPlayers();
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
    getPlayers() {
      fetch(this.dbURL)
        .then(res => res.json())
        .then((data) => {
          this.players = data;
        });
    },
    addPlayers() {
      fetch(this.dbURL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(this.player),
      })
        .then(res => res.json())
        .then(() => {
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
