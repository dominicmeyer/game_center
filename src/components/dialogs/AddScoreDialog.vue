<template>
    <BaseDialog :is-open="isOpen" :title="'Neue Runde eintragen'" @close="emit('close')" @submit="addScore">
        <label>Erzielte Punkte: </label>
        <input type="number" v-model="scoreToAdd">
    </BaseDialog>
</template>

<script setup lang="ts">
import { Game, Player, Score } from '@/types/types';
import { useGamesStore } from '@/stores/gameStorage';
import { ref } from 'vue';
import BaseDialog from './BaseDialog.vue';

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

const emit = defineEmits<{
    (event: "close"): void
}>()

const gamesStore = useGamesStore()
const scoreToAdd = ref(0)

const addScore = () => {
    const latestScore = gamesStore.scores.findLatestScore(props.game, props.player)
    const newRound = latestScore?.round == null ? 1 : latestScore.round + 1
    const newScore = latestScore?.score == null ? scoreToAdd.value : latestScore.score + scoreToAdd.value
    const score = new Score(props.player, newScore, newRound, props.game.id)

    console.log(props.player)
    console.log(newRound)
    console.log(newScore)

    gamesStore.scores.add(score)

    scoreToAdd.value = 0
    emit("close")
}
</script>