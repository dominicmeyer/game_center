import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import QwirklePage from '@/views/QwirklePage.vue';
import PlayerPage from '@/views/PlayerPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/games/'
  },
  {
    path: '/games/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/games/players'
      },
      {
        path: 'qwirkle',
        component: QwirklePage
      },
      {
        path: "players",
        component: PlayerPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
