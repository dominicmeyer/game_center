<template>
    <BaseDialog :is-open="isOpen" :title="'Neues Spiel erstellen'" @close="close" @submit="addGame">
        <ion-item>
            <h1>Spieler hinzufügen:</h1>
        </ion-item>
        <ion-item v-for="player in playersStore.players.filter((p) => p.id != 0)">
            <ion-checkbox slot="start" @ionChange="changePlayerStatus(player)" label-placement="end">{{
                player.name
            }}</ion-checkbox>
        </ion-item>
    </BaseDialog>
</template>

<script setup lang="ts">
import { IonItem, IonCheckbox } from '@ionic/vue';
import { useGamesStore } from '@/stores/gameStorage';
import BaseDialog from './BaseDialog.vue';
import { usePlayersStore } from '@/stores/playerStorage';
import { Player } from '@/types/player';
import { GameType } from '@/types/gameType';
import { Game } from '@/types/game';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    gameType: {
        type: GameType,
        required: true
    }
})

const emit = defineEmits<{
    (event: "close"): void
}>()

const gamesStore = useGamesStore()
const playersStore = usePlayersStore()
const playersToAdd: Set<Player> = new Set()

const addGame = () => {
    const newGame = new Game(props.gameType.id)

    playersToAdd.forEach((player) => {
        newGame.add(player)
    })

    gamesStore.add(newGame)
    close()
}
const close = () => {
    playersToAdd.clear()
    emit("close")
}
const changePlayerStatus = (player: Player) => {
    if (playersToAdd.has(player)) {
        playersToAdd.delete(player)
    } else {
        playersToAdd.add(player)
    }
}
</script>