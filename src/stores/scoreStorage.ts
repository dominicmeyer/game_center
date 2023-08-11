import { Game, Player, Score } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Collection, Sortable } from './collection'

export const useScoresStore = defineStore('scores', () => {
    const scores = ref(new Scores())

    return scores
})

export class Scores 
    extends Collection<Score>
    implements Sortable<Score> {

    constructor(items?: Score[]) {
        super(items)
    }

    sorted(): Score[] {
        return this.array().sort((a,b) => a.round - b.round)
    }

    filter(game: Game) {
        return new Scores(this.array().filter((s) => s.gameId == game.id))
    }

    findHighestRound(game: Game) {
        return this.filter(game).array().reduce((acc, s) => acc > s.round ? acc : s.round, 0)
    }

    findPlayerScores(game: Game, player: Player) {
        return this.filter(game).array().filter((s) => s.player.equals(player))
    }

    findLatestScore(game: Game, player: Player) {
        const playerScores = this.findPlayerScores(game, player)
        const latestRound = playerScores.reduce((acc, s) => acc > s.round ? acc : s.round, 0)
        return playerScores.find((s) => s.round == latestRound)
    }
}