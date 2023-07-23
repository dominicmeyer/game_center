import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import QwirklePage from '@/views/QwirklePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/games/qwirkle'
  },
  {
    path: '/games/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/games/qwirkle'
      },
      {
        path: 'qwirkle',
        component: QwirklePage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
