<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ vsText }}</ion-card-title>
            <ion-card-subtitle>Spiel-Nr.: {{ game?.gameNumber }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content :key="contentKey">
            <p>Runde: {{ lastRound }}</p>
            <p v-for="score in latestScore">{{ score.player.name }}: {{ score.score }}
                <input type="text" :id="inputId + '.' + score.player.name">
                <Button :type="ButtonType.Add" @click="addToPlayerScore(inputId + '.' + score.player.name, score.player.name)" />
            </p>

            <Button :type="ButtonType.Delete" @click="deleteFunction(game)" />
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
    props: {
        game: {
            type: Game,
            required: true
        },
        deleteFunction: {
            type: Function,
            required: true
        },
        addPlayerFunction: {
            type: Function,
            required: true
        },
        addToPlayerScoreFunction: {
            type: Function,
            required: true
        }
    },
    methods: {
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
            await this.addPlayerFunction(playerNameElement.value, this.game)
            this.closePlayerDialog()
        },
        async addToPlayerScore(playerInputId: string, playerName: string) {
            const newPlayerScoreElement = document.getElementById(playerInputId) as HTMLInputElement
            await this.addToPlayerScoreFunction(parseInt(newPlayerScoreElement.value), playerName, this.game)
            this.contentKey++
        }
    },
    setup(props) {
        const scores: Score[] = props.game!.scores.sort((a, b) => a.player.name.localeCompare(b.player.name))

        const vsText: string | undefined = scores.filter((s) => s.round == 1).map((s) => s.player.name).reduce((acc, p, i) => {
            return i == 0 ? p : acc + " vs " + p
        }, "")

        const lastRound: number = scores.map((s) => s.round).reduce((max, r) => max > r ? max : r, 1)

        let players: Player[] = []

        for (const score of scores) {
            if (players.find((p) => p.name == score.player.name) == undefined) {
                players.push(score.player)
            }
        }

        const latestScore: Score[] = players.map((p) => {
            const maxRound = scores.filter((s) => s.player.name == p.name).reduce((acc,s) => acc > s.round ? acc : s.round, 1)
            return scores.find((s) => s.round == maxRound && s.player.name == p.name)!
        })

        const inputId = props.game.gameNumber.toString() + "." + props.game.type.toString() + ".input"
        const dialogId = props.game.gameNumber.toString() + "." + props.game.type.toString() + ".dialog"
        const dialogOpened = false

        const contentKey = ref(0)

        return {
            vsText, latestScore, lastRound, dialogId, ButtonType, dialogOpened, contentKey, inputId
        }
    }
});
</script>