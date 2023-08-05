import { Game, Player } from '@/types/types'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useGamesStore = defineStore('games', {
    state: () => {
        const games: Game[] = []
        const players: Set<Player> = new Set()

        return {
            games,
            players
        }
    },
    getters: {
        nextPlayerId() {
            const highestId: number = Array.from(this.players).reduce((acc, p) => acc > p.getId() ? acc : p.getId(), 0)
            return highestId + 1
        }
    },
    actions: {
        addPlayer(player: Player) {
            this.players.add(player)
        }
    }
})