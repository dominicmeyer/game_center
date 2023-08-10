<template>
    <ion-modal :is-open="isOpen" @willDismiss="close">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <Button @click="close" :type="ButtonType.Close" />
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
                <ion-checkbox slot="start" @ionChange="changePlayerStatus(player)" label-placement="end">{{
                    player.name
                }}</ion-checkbox>
            </ion-item>
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonModal, IonCheckbox } from '@ionic/vue';
import Button from '@/components/Button.vue';
import { ButtonType } from '@/components/Button.vue';
import { Game, GameType, Player } from '@/types/types';
import { ref, watch } from 'vue';
import { useGamesStore } from '@/stores/gameStorage';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits({
    closed: () => true
})

const isOpen = ref(props.isOpen)
const gamesStore = useGamesStore()
const playersToAdd: Set<Player> = new Set()

watch(props, (props) => {
    isOpen.value = props.isOpen
})

const addGame = () => {
    const newGame = new Game(GameType.Qwirkle)

    playersToAdd.forEach((player) => {
        newGame.add(player)
    })

    gamesStore.games.add(newGame)
    close()
}
const close = () => {
    isOpen.value = false
    playersToAdd.clear()
    emit("closed")
}
const changePlayerStatus = (player: Player) => {
    if (playersToAdd.has(player)) {
        playersToAdd.delete(player)
    } else {
        playersToAdd.add(player)
    }
}
</script>