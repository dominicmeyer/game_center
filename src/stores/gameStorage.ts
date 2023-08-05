import { Game, Player, Players } from '@/types/types'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useGamesStore = defineStore('games', () => {
    const games: Ref<Game[]> = ref([])
    const players = ref(new Players())

    return {
        games,
        players
    }
})