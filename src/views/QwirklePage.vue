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
          <ion-item v-for="player in gamesStore.players.sorted()">
            <ion-checkbox slot="start" @ionChange="changePlayerIdStatus(player)" label-placement="end">{{ player.name
            }}</ion-checkbox>
          </ion-item>
        </ion-content>
      </ion-modal>

      <ion-item v-for="game in gamesStore.games.filter(GameType.Qwirkle).sorted()">
        <GameCard :game="game" />
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton, IonModal, IonCheckbox } from '@ionic/vue';
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

    gamesStore.players.add(new Player("Dominic"))
    gamesStore.players.add(new Player("Josy"))
    gamesStore.players.add(new Player("Anna"))

    const game1 = new Game(GameType.Qwirkle)
    const game2 = new Game(GameType.Qwirkle)
    const game3 = new Game(GameType.Qwirkle)

    gamesStore.players.array().forEach((p) => {
      game1.add(p)
      game2.add(p)
      game3.add(p)
    })

    gamesStore.games.add(game1)
    gamesStore.games.add(game2)
    gamesStore.games.add(game3)

    return {
      gamesStore,
      ButtonType,
      GameType,
      playersToAdd
    }
  },
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, GameCard, Button, IonButton, IonModal, IonCheckbox
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
        newGame.add(player)
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