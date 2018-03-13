import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import PlayersList from '@/components/PlayersList';
import AddPlayer from '@/components/AddPlayer';
import UpdatePlayer from '@/components/UpdatePlayer';
import PolarChart from '@/components/PolarChart';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/players',
      name: 'PlayersList',
      component: PlayersList,
    },
    {
      path: '/add-player',
      name: 'AddPlayer',
      component: AddPlayer,
    },
    {
      path: '/update-player/:id',
      name: 'UpdatePlayer',
      component: UpdatePlayer,
    },
    {
      path: '/polar-chart',
      name: 'PolarChart',
      component: PolarChart,
    },
  ],
});
