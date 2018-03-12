import Vue from 'vue';
// import VueChart from 'vue-chart-js';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
// Vue.use(VueChart);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
