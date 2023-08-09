import { Games, Players, Scores } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGamesStore = defineStore('games', () => {
    const games = ref(new Games())
    const players = ref(new Players())
    const scores = ref(new Scores())

    return {
        games,
        players,
        scores
    }
})