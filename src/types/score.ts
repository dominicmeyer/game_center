import { Player } from "./types"

export class Score {
    private player: Player
    private score: number
    private round: number

    static StartingScore = 0
    static StartingRound = 0

    constructor(player: Player, score?: number, round?: number) {
        this.player = player
        this.score = score == null ? Score.StartingScore : score
        this.round = round == null ? Score.StartingRound : round
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