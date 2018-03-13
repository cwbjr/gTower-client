
const service = {
  db_origin_URL: 'https://g-tower-server.herokuapp.com',
  db_profession_URL: 'https://g-tower-server.herokuapp.com',
  dbURL: 'https://g-tower-server.herokuapp.com',

  getPlayersOrigin() {
    return fetch(this.db_origin_URL)
      .then(res => res.json())
      .then((data) => {
        this.origins = data;
        return data;
      });
  },
  getPlayersProfession() {
    return fetch(this.db_profession_URL)
      .then(res => res.json())
      .then((data) => {
        this.professions = data;
        return data;
      });
  },
  getPlayers() {
    return fetch(this.dbURL)
      .then(res => res.json());
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
  },
};

export default service;
