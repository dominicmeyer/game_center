<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>
                {{ game.vsText() }}
                <Button @click="removeGame" :type="ButtonType.Delete" />
            </ion-card-title>
            <ion-card-subtitle>
                Aktuelle Runde: {{ scoresStore.highestRound(game) }} ID: {{ game.id }}
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <ion-item v-for="player in game.players">
                <p>
                    {{ player.name }}: {{ playerScore(player) }}
                </p>
                <p>
                    <Button :type="ButtonType.Add" @click="openDialog(player)" />
                </p>
                <AddScoreDialog @close="closeDialog(player)" :game="game" :player="player" :is-open="dialogControl.get(player)!" />
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>
  
<script lang="ts" setup>
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem } from '@ionic/vue';
import Button, { ButtonType } from '@/components/Button.vue';
import { useGamesStore } from '@/stores/gameStorage';
import { ref } from 'vue';
import AddScoreDialog from '@/components/dialogs/AddScoreDialog.vue';
import { useScoresStore } from '@/stores/scoreStorage';
import { useGamesPlayersStore } from '@/stores/gamesPlayerStorage';
import { Game } from '@/types/game';
import { Player } from '@/types/player';

const props = defineProps({
    game: {
        type: Game,
        required: true
    },
})

const gamesStore = useGamesStore()
const gamesPlayersStore = useGamesPlayersStore()
const scoresStore = useScoresStore()
const dialogControl = ref(
    new Map(props.game.players.map((p) => [p, false]))
)

const removeGame = () => {
    gamesStore.remove(props.game)
}
const playerScore = (player: Player) => {
    const latestScore = scoresStore.latestScore(props.game, player)
    return latestScore == null ? 0 : latestScore.score
}
const openDialog = (player: Player) => {
    dialogControl.value.set(player, true)
}
const closeDialog = (player: Player) => {
    dialogControl.value.set(player, false)
}
</script>