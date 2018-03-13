<template>
  <div class="container">
    <div class="polar-chart can" v-if="chartData">
      <vue-chart type="polarArea" :data="chartData"></vue-chart>
    </div>
  </div>
</template>

<script>
import VueChart from 'vue-chart-js';

export default {
  name: 'PolarChart',
  components: {
    VueChart,
  },
  data() {
    return {
      chartData: null,
      players: [],
      dbURL: 'http://localhost:3000/api/player',
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
          const chartData = {
            labels: [],
            datasets: [
              {
                label: 'Player Chart',
                backgroundColor: [],
                data: [],
              },
            ],
          };
          data.forEach((info) => {
            chartData.datasets[0].backgroundColor.push('blue', 'green', 'orange', 'purple', 'red', 'yellow');
            chartData.labels.push(info.name);
            chartData.datasets[0].data.push(info.level);
          });
          this.chartData = chartData;
        });
    },
  },
};
</script>

<style scoped>
.polar-chart {
  max-width: 1248px;
  min-width: 720px;
  margin: 75px auto;
}
canvas div {
  font-size: 20rem;
}
</style>
