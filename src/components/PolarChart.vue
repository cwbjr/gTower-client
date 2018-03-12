<template>
  <div class="polar-chart container">
    <div v-if="chartData">
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
                label: 'Component 1',
                backgroundColor: ['blue', 'green', 'orange'],
                data: [],
              },
            ],
          };
          data.forEach((info) => {
            chartData.labels.push(info.name);
            chartData.datasets[0].data.push(info.level);
          });
          this.chartData = chartData;
        });
    },
  },
};
</script>

<style>
.polar-chart {
  max-width: 1024px;
  min-width: 460px;
  margin: 75px auto;
}
</style>
