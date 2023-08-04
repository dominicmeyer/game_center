import { Player, Score } from "./types"

export class Game {
    private type: GameType
    private gameNumber: number
    private scores: Score[]

    constructor(type: GameType, gameNumber: number, scores: Score[]) {
        this.type = type
        this.scores = scores
        this.gameNumber = gameNumber
    }

    signature() {
        return `${this.type}.${this.gameNumber}`
    }

    equals(otherGame: Game) {
        return this.signature() == otherGame.signature()
    }

    getType() {
        return this.type
    }

    getGameNumber() {
        return this.gameNumber
    }

    getScores() {
        return this.scores
    }

    getPlayerScores(player: Player) {
        return this.getScores().filter((s: Score) => s.getPlayer().equals(player))
    }

    getLatestScore(player?: Player) {
        const scores = player != null ? this.getPlayerScores(player) : this.getScores()

        if (scores.length == 0) {
            return null
        }

        return scores.reduce((acc, s) => acc.getRound() > s.getRound() ? acc : s)
    }

    getPlayers() {
        let players: Set<Player> = new Set()

        this.getScores().forEach((s) => players.add(s.getPlayer()))

        return Array.from(players).sort((a, b) => a.getName().localeCompare(b.getName()))
    }

    getVsText() {
        return this.getPlayers().reduce((acc, p, i) => {
            return i == 0 ? p.getName() : `${acc} vs ${p.getName()}`
        }, "")
    }

    addPlayer(name: string) {
        this.scores.push(new Score(new Player(name)))
    }

    addToPlayerScore(player: Player, round: number, newScore: number) {
        this.scores.push(new Score(player, newScore, round))
    }
}

export enum GameType {
    Qwirkle
}

export class QwirkleGame extends Game {
    constructor(gameNumber: number, scores: Score[]) {
        super(QwirkleGame.getType(), gameNumber, scores)
    }

    public static getType() {
        return GameType.Qwirkle
    }
}