<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Qwirkle</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Qwirkle</ion-title>
        </ion-toolbar>
      </ion-header>

      <div :key="listKey">
        <ion-item><Button :type="ButtonType.Add" @click="addNewGame()" /></ion-item>
        <ion-item v-for="game in sortGames()">
          <ContainerCard :game="game" :delete-function="deleteGame" :add-player-function="addPlayer"
            :add-to-player-score-function="addToPlayerScore" />
        </ion-item>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton } from '@ionic/vue';
import ContainerCard from '@/components/ContainerCard.vue';
import Button from '@/components/Button.vue';
import { ButtonType } from '@/components/Button.vue';
import { QwirkleGame, GameStorage, Game } from '@/types';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  async setup() {
    const qwirkleStore = new GameStorage()
    await qwirkleStore.create()

    const listKey = ref(0)
    const gamesPlayed = await qwirkleStore.getGames(QwirkleGame.getType())

    return {
      qwirkleStore,
      gamesPlayed,
      listKey,
      ButtonType
    }
  },
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, ContainerCard, Button, IonButton
  },
  methods: {
    async addNewGame() {
      const gameNumber: number = this.gamesPlayed.length + 1
      const newGame = new QwirkleGame(gameNumber, [])

      this.listKey++
      this.gamesPlayed.push(newGame)
      await this.qwirkleStore.add(newGame)
    },
    sortGames(): QwirkleGame[] {
      return this.gamesPlayed.sort((a, b) => b.gameNumber - a.gameNumber)
    },
    async deleteGame(game: Game) {
      await this.qwirkleStore.remove(game)
      this.gamesPlayed = this.gamesPlayed.filter((g) => !g.equals(game))
      this.listKey++
    },
    async addPlayer(playerName: string, game: Game) {
      await this.qwirkleStore.addPlayer(playerName, game)
      this.gamesPlayed = this.gamesPlayed.map((g) => {
        if (g.equals(game)) {
          g.addPlayer(playerName)
        }
        return g
      })
      this.listKey++
    },
    async addToPlayerScore(newScore: number, playerName: string, game: Game) {
      await this.qwirkleStore.addToPlayerScore(newScore, playerName, game)
      this.gamesPlayed = this.gamesPlayed.map((g) => {
        if (g.equals(game)) {
          const latestScore = this.gamesPlayed.find((g) => g.equals(game))?.scores.reduce((acc, s) => s.getPlayer().getName() != playerName ? acc : acc == null ? s : acc.getRound() > s.getRound() ? acc : s)
          g.addToPlayerScore(playerName, latestScore!.getRound() + 1, latestScore!.getScore() + newScore)
        }
        return g
      })
      this.listKey++
    }
  },
})
</script>