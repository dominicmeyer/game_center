<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <ion-select v-model="gameTypeId">
                        <ion-select-option v-for="gameType in gameTypesStore.gameTypes" :value="gameType.id">{{
                            gameType.name }}</ion-select-option>
                    </ion-select>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Spiele</ion-title>
                </ion-toolbar>
            </ion-header>

            <Button @click="startDialog" :type="ButtonType.Add" />

            <AddGameDialog @close="closeDialog" :is-open="addGameDialogIsOpen" :game-type="gameTypesStore.get(gameTypeId)!" />

            <ion-item v-for="game in gamesStore.filter(gameTypesStore.get(gameTypeId)!)">
                <GameCard :game="game" />
            </ion-item>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
import GameCard from '@/components/GameCard.vue';
import Button from '@/components/Button.vue';
import { ButtonType } from '@/components/Button.vue';
import { onMounted, ref } from 'vue';
import { useGamesStore } from '@/stores/gameStorage';
import AddGameDialog from '@/components/dialogs/AddGameDialog.vue';
import { usePlayersStore } from '@/stores/playerStorage';
import { qwirkleGameType } from '@/types/gameType';
import { Player } from '@/types/player';
import { Game } from '@/types/game';
import { useGameTypesStore } from '@/stores/gameTypeStorage';

const addGameDialogIsOpen = ref(false)
const gamesStore = useGamesStore()
const playersStore = usePlayersStore()
const gameTypesStore = useGameTypesStore()
const gameTypeId = ref(qwirkleGameType().id)

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
            let game = new Game(qwirkleGameType().id)

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