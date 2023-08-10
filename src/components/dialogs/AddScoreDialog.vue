<template>
    <ion-modal :is-open="isOpen" @willDismiss="close">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <Button @click="close" :type="ButtonType.Close" />
                </ion-buttons>
                <ion-title>Neue Runde eintragen</ion-title>
                <ion-buttons slot="end">
                    <Button @click="addScore" :type="ButtonType.Save" />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <label>Erzielte Punkte: </label>
            <input type="number" v-model="scoreToAdd">
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonContent, IonToolbar, IonHeader, IonButtons, IonTitle } from '@ionic/vue';
import Button, { ButtonType } from '../Button.vue';
import { Game, Player, Score } from '@/types/types';
import { useGamesStore } from '@/stores/gameStorage';
import { ref, watch } from 'vue';

const props = defineProps({
    player: {
        type: Player,
        required: true
    },
    game: {
        type: Game,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: true,
    }
})

const emit = defineEmits({
    closed: () => true
})

const isOpen = ref(props.isOpen)
const gamesStore = useGamesStore()
const scoreToAdd = ref(0)

watch(props, (props) => {
    isOpen.value = props.isOpen
})

const close = () => {
    isOpen.value = false
    emit("closed")
}
const addScore = () => {
    const latestScore = gamesStore.scores.findLatestScore(props.game, props.player)
    const newRound = latestScore?.round == null ? 1 : latestScore.round + 1
    const newScore = latestScore?.score == null ? scoreToAdd.value : latestScore.score + scoreToAdd.value
    const score = new Score(props.player,newScore,newRound,props.game.id)

    gamesStore.scores.add(score)

    scoreToAdd.value = 0
    close()
}
</script>