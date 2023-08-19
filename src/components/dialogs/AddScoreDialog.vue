<template>
    <BaseDialog :is-open="isOpen" :title="'Neue Runde eintragen'" @close="emit('close')" @submit="addScore">
        <label>Erzielte Punkte: </label>
        <input type="number" v-model="scoreToAdd">
    </BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseDialog from './BaseDialog.vue';
import { useScoresStore } from '@/stores/scoreStorage';
import { Score } from '@/types/score';
import { Player } from '@/types/player';
import { Game } from '@/types/game';

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

const scoresStore = useScoresStore()
const scoreToAdd = ref(0)

const addScore = () => {
    const latestScore = scoresStore.latestScore(props.game, props.player)
    const newRound = latestScore?.round == null ? 1 : latestScore.round + 1
    const newScore = latestScore?.score == null ? scoreToAdd.value : latestScore.score + scoreToAdd.value
    const score = new Score(props.player.id, newScore, newRound, props.game.id)

    console.log(props.player)
    console.log(newRound)
    console.log(newScore)

    scoresStore.add(score)

    scoreToAdd.value = 0
    emit("close")
}
</script>