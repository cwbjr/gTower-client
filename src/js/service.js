
const service = {
  db_origin_URL: 'http://localhost:3000/api/origin',
  db_profession_URL: 'http://localhost:3000/api/profession',
  dbURL: 'http://localhost:3000/api/player',

  getPlayersOrigin() {
    return fetch(this.db_origin_URL)
      .then(res => res.json())
      .then((data) => {
        this.origins = data;
        // console.log(data);
        return data;
      });
  },
  getPlayersProfession() {
    return fetch(this.db_profession_URL)
      .then(res => res.json())
      .then((data) => {
        this.professions = data;
        console.log('service.professions', data);
        return data;
      });
  },
  getPlayers() {
    return fetch(this.dbURL)
      .then(res => res.json());
    // .then((data) => {
    // this.players = data;
    // console.log(data);
    // });
  },
  addPlayers() {
    return fetch(this.dbURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(this.player),
    })
      .then(res => res.json());
    // .then(() => {

    // console.log('player', this.player);
    // });
  },
};

export default service;
