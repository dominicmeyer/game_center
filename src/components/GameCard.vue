<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>
                {{ game.getVsText() }}
                <Button @click="removeGame" :type="ButtonType.Delete" />
            </ion-card-title>
            <ion-card-subtitle>
                Aktuelle Runde: {{ gamesStore.scores.findHighestRound(game) }}
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <ion-item v-for="player in game.getPlayers()">
                <p>
                    {{ player.getName() }}: {{ playerScore(player) }}
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
  
<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonModal, IonContent, IonToolbar, IonHeader, IonButtons, IonTitle } from '@ionic/vue';
import Button, { ButtonType } from './Button.vue';
import { Game, Player, Score } from '@/types/types';
import { useGamesStore } from '@/stores/gameStorage';
import { ref } from 'vue';

export default {
    setup() {
        const gamesStore = useGamesStore()
        const scoreToAdd = ref(0)

        return {
            ButtonType,
            gamesStore,
            scoreToAdd
        }
    },
    data() {
        let playerToAddScore: Player | undefined

        return {
            addScoreDialogIsOpen: false,
            playerToAddScore
        }
    },
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, Button, IonItem, IonModal, IonContent, IonToolbar, IonHeader, IonButtons, IonTitle },
    props: {
        game: {
            type: Game,
            required: true
        },
    },
    methods: {
        removeGame() {
            this.gamesStore.games.remove(this.game)
        },
        playerScore(player: Player) {
            const latestScore = this.gamesStore.scores.findLatestScore(this.game, player)
            return latestScore == null ? 0 : latestScore.getScore()
        },
        startAddScoreDialog(player: Player) {
            this.playerToAddScore = player
            this.addScoreDialogIsOpen = true
        },
        closeAddScoreDialog() {
            this.addScoreDialogIsOpen = false
        },
        addScore() {
            const player = this.playerToAddScore! as Player
            const playerLatestScore = this.gamesStore.scores.findLatestScore(this.game, player)?.getScore()
            const playerLatestRound = this.gamesStore.scores.findLatestScore(this.game, player)?.getRound()

            this.gamesStore.scores.add(
                new Score(
                    player, 
                    this.game.getId(), 
                    playerLatestScore == null ? this.scoreToAdd : playerLatestScore + this.scoreToAdd, 
                    playerLatestRound == null ? 1 : playerLatestRound + 1)
            )

            this.scoreToAdd = 0
            this.closeAddScoreDialog()
        },
    },
}
</script>