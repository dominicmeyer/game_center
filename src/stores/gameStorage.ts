import { Game, Player } from '@/types/types'
import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
    state: () => {
        const games: Game[] = []
        const players: Player[] = []

        return {
            games,
            players
        }
    },
    getters: {
        newPlayerId() {
            const highestId: number = this.players.reduce((acc,p) => acc > p.getId() ? acc : p.getId(), 0)
            return highestId + 1
        }
    },
    actions: {
        
    }
})