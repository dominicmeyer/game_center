import { Games, Players } from '@/types/types'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useGamesStore = defineStore('games', () => {
    const games = ref(new Games())
    const players = ref(new Players())

    return {
        games,
        players
    }
})