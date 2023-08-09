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
                        <ion-checkbox slot="start" @ionChange="changePlayerIdStatus(player)" label-placement="end">{{
                            player.name
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

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton, IonModal, IonCheckbox } from '@ionic/vue';
import GameCard from '@/components/GameCard.vue';
import Button from '@/components/Button.vue';
import { ButtonType } from '@/components/Button.vue';
import { Game, GameType, Player } from '@/types/types';
import { defineComponent, ref } from 'vue';
import { useGamesStore } from '@/stores/gameStorage';

const addGameDialogIsOpen = ref(false)
const gamesStore = useGamesStore()
const playersToAdd: Set<Player> = new Set()

gamesStore.players.add(new Player("Dominic"))
gamesStore.players.add(new Player("Josy"))
gamesStore.players.add(new Player("Anna"))

for (let i = 0; i < 3; i++) {
    const game = new Game(GameType.Qwirkle)

    gamesStore.players.array().forEach((p) => {
        game.add(p)
    })

    gamesStore.games.add(game)
}

const addGame = () => {
    const newGame = new Game(GameType.Qwirkle)

    playersToAdd.forEach((player) => {
        newGame.add(player)
    })

    gamesStore.games.add(newGame)
    closeAddGameDialog()
    playersToAdd.clear()
}
const startAddGameDialog = () => {
    addGameDialogIsOpen.value = true
}
const closeAddGameDialog = () => {
    addGameDialogIsOpen.value = false
    playersToAdd.clear()
}
const changePlayerIdStatus = (player: Player) => {
    if (playersToAdd.has(player)) {
        playersToAdd.delete(player)
    } else {
        playersToAdd.add(player)
    }
}
</script>