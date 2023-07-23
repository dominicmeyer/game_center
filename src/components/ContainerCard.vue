<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ vsText }}</ion-card-title>
            <ion-card-subtitle>Spiel-Nr.: {{ game?.getGameNumber() }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content :key="contentKey">
            <p>Runde: {{ lastRound }}</p>
            <p v-for="score in latestScore">{{ score.getPlayer().getName() }}: {{ score.getScore() }}
                <input type="text" :id="inputId + '.' + score.getPlayer().getName()">
                <Button :type="ButtonType.Add"
                    @click="addToPlayerScore(inputId + '.' + score.getPlayer().getName(), score.getPlayer())" />
            </p>

            <Button :type="ButtonType.Delete" @click="deleteGame(game)" />
            <Button :type="ButtonType.Add" v-if="lastRound == 1" @click="openPlayerDialog()" />

        </ion-card-content>
    </ion-card>

    <dialog closed :id="dialogId">
        <input type="text" :id="inputId" placeholder="Spieler-Name">

        <Button :type="ButtonType.Close" @click="closePlayerDialog()" />
        <Button :type="ButtonType.Save" @click="submitPlayerDialog()" />
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
        async submitPlayerDialog() {
            const playerNameElement = document.getElementById(this.inputId) as HTMLInputElement
            this.$emit("addPlayer", playerNameElement.value, this.game)
            this.closePlayerDialog()
        },
        async addToPlayerScore(playerInputId: string, player: Player) {
            const newPlayerScoreElement = document.getElementById(playerInputId) as HTMLInputElement
            this.$emit("addToPlayerScore", parseInt(newPlayerScoreElement.value), player, this.game)
            this.contentKey++
        }
    },
    setup(props) {
        const scores: Score[] = props.game!.getScores().sort((a, b) => a.getPlayer().getName().localeCompare(b.getPlayer().getName()))

        const vsText: string | undefined = scores.filter((s) => s.getRound() == 1).map((s) => s.getPlayer().getName()).reduce((acc, p, i) => {
            return i == 0 ? p : acc + " vs " + p
        }, "")

        const lastRound: number = scores.map((s) => s.getRound()).reduce((max, r) => max > r ? max : r, 1)

        let players: Player[] = []

        for (const score of scores) {
            if (players.find((p) => p.getName() == score.getPlayer().getName()) == undefined) {
                players.push(score.getPlayer())
            }
        }

        const latestScore: Score[] = players.map((p) => {
            const maxRound = scores.filter((s) => s.getPlayer().getName() == p.getName()).reduce((acc, s) => acc > s.getRound() ? acc : s.getRound(), 1)
            return scores.find((s) => s.getRound() == maxRound && s.getPlayer().getName() == p.getName())!
        })

        const inputId = props.game.getGameNumber().toString() + "." + props.game.getType().toString() + ".input"
        const dialogId = props.game.getGameNumber().toString() + "." + props.game.getType().toString() + ".dialog"
        const dialogOpened = false

        const contentKey = ref(0)

        return {
            vsText, latestScore, lastRound, dialogId, ButtonType, dialogOpened, contentKey, inputId
        }
    }
});
</script>