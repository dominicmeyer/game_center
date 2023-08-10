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

            <Button @click="startDialog" :type="ButtonType.Add" />

            <AddGameDialog @closed="closedDialog" :is-open="addGameDialogIsOpen" />

            <ion-item v-for="game in gamesStore.games.filter(GameType.Qwirkle).sorted()">
                <GameCard :game="game" />
            </ion-item>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem } from '@ionic/vue';
import GameCard from '@/components/GameCard.vue';
import Button from '@/components/Button.vue';
import { ButtonType } from '@/components/Button.vue';
import { Game, GameType, Player } from '@/types/types';
import { ref } from 'vue';
import { useGamesStore } from '@/stores/gameStorage';
import AddGameDialog from '@/components/dialogs/AddGameDialog.vue';

const addGameDialogIsOpen = ref(false)
const gamesStore = useGamesStore()

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

const startDialog = () => {
    addGameDialogIsOpen.value = true
}
const closedDialog = () => {
    addGameDialogIsOpen.value = false
}
</script>