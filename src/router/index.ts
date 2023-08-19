import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import PlayerPage from '@/views/tabs/PlayerPage.vue';
import SettingsPage from "@/views/tabs/SettingsPage.vue"
import GamesPage from '@/views/tabs/GamesPage.vue';
import GameTypesPage from "@/views/tabs/settings/GameTypesPage.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: "/",
        redirect: "/players"
      },
      {
        path: "settings/",
        component: SettingsPage
      },
      {
        path: "settings/game_types/",
        component: GameTypesPage
      },
      {
        path: "players/",
        component: PlayerPage
      },
      {
        path: 'games/',
        component: GamesPage
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
