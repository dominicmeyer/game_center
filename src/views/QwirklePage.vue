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

            <AddGameDialog @close="closeDialog" :is-open="addGameDialogIsOpen" :game-type="qwirkleGameType()" />

            <ion-item v-for="game in gamesStore.filter(qwirkleGameType())">
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
import { Game, GameType, Player, qwirkleGameType } from '@/types/types';
import { onMounted, ref } from 'vue';
import { useGamesStore } from '@/stores/gameStorage';
import AddGameDialog from '@/components/dialogs/AddGameDialog.vue';
import { usePlayersStore } from '@/stores/playerStorage';

const addGameDialogIsOpen = ref(false)
const gamesStore = useGamesStore()
const playersStore = usePlayersStore()

onMounted(() => {
    if (gamesStore.games.length == 0) {
        const playersNames = ["Dominic", "Josy", "Anna"]
        let players: Player[] = []

        playersNames.forEach((n) => {
            const player = new Player(n)
            playersStore.add(player)
            players.push(player)
        })

        for (let i = 0; i < 3; i++) {
            let game = new Game(qwirkleGameType())

            players.forEach((p) => {
                game.add(p)
            })
            
            gamesStore.add(game)
        }
    }
})

const startDialog = () => {
    addGameDialogIsOpen.value = true
}
const closeDialog = () => {
    addGameDialogIsOpen.value = false
}
</script>