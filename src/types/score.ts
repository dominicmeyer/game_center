import { useGamesStore } from "@/stores/gameStorage"
import { Game, Player } from "./types"

export class Score {
    private id: number
    private gameId: number
    private player: Player
    private score: number
    private round: number

    static StartingScore = 0
    static StartingRound = 0

    constructor(player: Player, gameId: number, score: number, round: number) {
        const gameStorage = useGamesStore()
        
        this.id = gameStorage.games.nextId()
        this.gameId = gameId
        this.player = player
        this.score = score
        this.round = round
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

    getId() {
        return this.id
    }

    getGameId() {
        return this.gameId
    }
}

export class Scores {
    private scores: Set<Score>

    constructor() {
        this.scores = new Set()
    }

    nextId() {
        const highestId: number = Array.from(this.scores).reduce((acc, p) => acc > p.getId() ? acc : p.getId(), 0)
        return highestId + 1
    }

    add(score: Score) {
        this.scores.add(score)
    }

    list(game: Game) {
        return Array.from(this.scores).filter((s) => s.getGameId() == game.getId())
    }

    findHighestRound(game: Game) {
        return this.list(game).reduce((acc, s) => acc > s.getRound() ? acc : s.getRound(), 0)
    }

    findPlayerScores(game: Game, player: Player) {
        return this.list(game).filter((s) => s.getPlayer().equals(player))
    }

    findLatestScore(game: Game, player: Player) {
        const playerScores = this.findPlayerScores(game, player)
        const latestRound = playerScores.reduce((acc, s) => acc > s.getRound() ? acc : s.getRound(), 0)
        return playerScores.find((s) => s.getRound() == latestRound)
    }
}