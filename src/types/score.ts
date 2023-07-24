import { Player } from "./types"

export class Score {
    private player: Player
    private score: number
    private round: number

    constructor(player: Player, score?: number, round?: number) {
        this.player = player
        this.score = score == null ? 0 : score
        this.round = round == null ? 1 : round
    }

    getPlayer() {
        return this.player
    }

    getScore() {
        return this.score
    }

    getRound() {
        return this.round
    }
}