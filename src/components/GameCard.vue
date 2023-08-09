<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>
                {{ game.vsText() }}
                <Button @click="removeGame" :type="ButtonType.Delete" />
            </ion-card-title>
            <ion-card-subtitle>
                Aktuelle Runde: {{ gamesStore.scores.findHighestRound(game) }}
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <ion-item v-for="player in game.players">
                <p>
                    {{ player.name }}: {{ playerScore(player) }}
                </p>
                <p>
                    <Button :type="ButtonType.Add" @click="startAddScoreDialog(player)" />
                </p>
            </ion-item>
        </ion-card-content>

        <ion-modal :is-open="addScoreDialogIsOpen" @willDismiss="closeAddScoreDialog">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <Button @click="closeAddScoreDialog" :type="ButtonType.Close" />
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
    </ion-card>
</template>
  
<script lang="ts" setup>
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonModal, IonContent, IonToolbar, IonHeader, IonButtons, IonTitle } from '@ionic/vue';
import Button, { ButtonType } from './Button.vue';
import { Game, Player, Score } from '@/types/types';
import { useGamesStore } from '@/stores/gameStorage';
import { Ref, ref } from 'vue';

const props = defineProps({
    game: {
        type: Game,
        required: true
    },
})

const gamesStore = useGamesStore()
const scoreToAdd = ref(0)
const addScoreDialogIsOpen = ref(false)
const playerToAddScore: Ref<Player | undefined> = ref(undefined)

const removeGame = () => {
    gamesStore.games.remove(props.game)
}
const playerScore = (player: Player) => {
    const latestScore = gamesStore.scores.findLatestScore(props.game, player)
    return latestScore == null ? 0 : latestScore.score
}
const startAddScoreDialog = (player: Player) => {
    playerToAddScore.value = player
    addScoreDialogIsOpen.value = true
}
const closeAddScoreDialog = () => {
    addScoreDialogIsOpen.value = false
}
const addScore = () => {
    const player = playerToAddScore.value!
    const playerLatestScore = gamesStore.scores.findLatestScore(props.game, player)?.score
    const playerLatestRound = gamesStore.scores.findLatestScore(props.game, player)?.round

    gamesStore.scores.add(
        new Score(
            player,
            props.game.id,
            playerLatestScore == null ? scoreToAdd.value : playerLatestScore + scoreToAdd.value,
            playerLatestRound == null ? 1 : playerLatestRound + 1)
    )

    scoreToAdd.value = 0
    closeAddScoreDialog()
}
</script>