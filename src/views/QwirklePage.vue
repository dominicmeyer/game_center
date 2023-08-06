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

      <Button @click="startAddGameDialog" :type="ButtonType.Add" />

      <ion-modal :is-open="addGameDialogIsOpen" @willDismiss="closeAddGameDialog">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <Button @click="closeAddGameDialog" :type="ButtonType.Close" />
            </ion-buttons>
            <ion-title>Neues Spiel erstellen</ion-title>
            <ion-buttons slot="end">
              <Button @click="addGame" :type="ButtonType.Save" />
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-item>
            <h1>Spieler hinzufügen:</h1>
          </ion-item>
          <ion-item v-for="player in gamesStore.players.list()">
            <ion-checkbox slot="start" @ionChange="changePlayerIdStatus(player)"></ion-checkbox>
            <ion-label>{{ player.getName() }}</ion-label>
          </ion-item>
        </ion-content>
      </ion-modal>

      <ion-item v-for="game in gamesStore.games.filter(GameType.Qwirkle)">
        <GameCard :game="game" />
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton, IonModal, IonCheckbox, IonLabel } from '@ionic/vue';
import GameCard from '@/components/GameCard.vue';
import Button from '@/components/Button.vue';
import { ButtonType } from '@/components/Button.vue';
import { Game, GameType, Player } from '@/types/types';
import { defineComponent } from 'vue';
import { useGamesStore } from '@/stores/gameStorage';

export default defineComponent({
  async setup() {
    const gamesStore = useGamesStore()
    const playersToAdd: Set<Player> = new Set()

    return {
      gamesStore,
      ButtonType,
      GameType,
      playersToAdd
    }
  },
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, GameCard, Button, IonButton, IonModal, IonCheckbox, IonLabel
  },
  data() {
    return {
      addGameDialogIsOpen: false
    }
  },
  methods: {
    addGame() {
      const newGame = new Game(GameType.Qwirkle)

      this.playersToAdd.forEach((player) => {
        newGame.addPlayer(player)
      })

      this.gamesStore.games.add(newGame)
      this.closeAddGameDialog()
      this.playersToAdd.clear()
    },
    startAddGameDialog() {
      this.addGameDialogIsOpen = true
    },
    closeAddGameDialog() {
      this.addGameDialogIsOpen = false
      this.playersToAdd.clear()
    },
    changePlayerIdStatus(player: Player) {
      if (this.playersToAdd.has(player)) {
        this.playersToAdd.delete(player)
      } else {
        this.playersToAdd.add(player)
      }
    }
  },
})
</script>