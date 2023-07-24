<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ vsText }}</ion-card-title>
            <ion-card-subtitle>Spiel-Nr.: {{ game?.getGameNumber() }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content :key="contentKey">
            <p>Runde: {{ lastRound }}</p>
            <p v-for="score in latestScores">{{ score?.getPlayer().getName() }}: {{ score?.getScore() }}
                <input type="number" :id="inputId(score!)">
                <Button :type="ButtonType.Add"
                    @click="addToPlayerScore(inputId(score!), score!.getPlayer())" />
            </p>

            <Button :type="ButtonType.Delete" @click="deleteGame(game)" />
            <Button :type="ButtonType.Add" v-if="lastRound == 1" @click="openPlayerDialog()" />

        </ion-card-content>
    </ion-card>

    <dialog closed :id="dialogId">
        <input type="text" :id="inputId" placeholder="Spieler-Name">

        <Button :type="ButtonType.Close" @click="closePlayerDialog()" />
        <Button :type="ButtonType.Save" @click="addPlayer()" />
    </dialog>
</template>
  
<script lang="ts">
import { Game, Player, Score } from '@/types';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import Button from './Button.vue';
import { ButtonType } from './Button.vue';

export default defineComponent({
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, Button },
    emits: {
        deleteGame: (game: Game) => {
            return game
        },
        addPlayer: (playerName: string, game: Game) => {
            return { playerName, game }
        },
        addToPlayerScore: (scoreToAdd: number, player: Player, game: Game) => {
            return { scoreToAdd, player, game }
        }
    },
    props: {
        game: {
            type: Game,
            required: true
        },
    },
    methods: {
        deleteGame(game: Game) {
            this.$emit("deleteGame", game)
        },
        openPlayerDialog() {
            const dialogElement = document.getElementById(this.dialogId) as HTMLDialogElement
            dialogElement.showModal()
            this.contentKey++
        },
        closePlayerDialog() {
            const dialogElement = document.getElementById(this.dialogId) as HTMLDialogElement
            dialogElement.close()
            this.contentKey++
        },
        async addPlayer() {
            const playerNameElement = document.getElementById(this.inputId) as HTMLInputElement
            this.$emit("addPlayer", playerNameElement.value, this.game)
            this.closePlayerDialog()
        },
        async addToPlayerScore(playerInputId: string, player: Player) {
            const newPlayerScoreElement = document.getElementById(playerInputId) as HTMLInputElement
            this.$emit("addToPlayerScore", parseInt(newPlayerScoreElement.value), player, this.game)
            this.contentKey++
        },
        inputId(score: Score) {
            return `${this.inputId}.${score.getPlayer().getName()}`
        }
    },
    setup(props) {
        const vsText = props.game.getVsText()
        const players = props.game.getPlayers()
        const latestScore = props.game.getLatestScore()
        const lastRound = latestScore == null ? 1 : latestScore.getRound()
        const latestScores = players.map((p) => props.game.getLatestScore(p)).filter((s) => s != null)
        const inputId = `${props.game.signature()}.input`
        const dialogId = `${props.game.signature()}.dialog`
        const dialogOpened = false
        const contentKey = ref(0)

        return {
            vsText, latestScores, lastRound, dialogId, ButtonType, dialogOpened, contentKey, inputId
        }
    }
});
</script>