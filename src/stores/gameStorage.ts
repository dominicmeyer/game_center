import { Game, Player, Players } from '@/types/types'
import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
    state: () => {
        const games: Game[] = []
        const players: Players = new Players()

        return {
            games,
            players
        }
    },
    getters: {
        nextPlayerId(): number {
            return this.players.nextPlayerId()
        }
    },
    actions: {
        addPlayer(player: Player) {
            if (this.players.containsName(player.getName())) {
                alert(`Es gibt bereits einen Spieler/in mit dem Namen ${player.getName()}`)
            } else {
                this.players.add(player)
            }
        },
        getPlayers() {
            return this.players.get()
        }
    }
})