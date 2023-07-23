import { Storage } from "@ionic/storage"

export class Player {
    private name: string

    constructor(name: string) {
        this.name = name
    }

    getName() {
        return this.name
    }

    equals(otherPlayer: Player) {
        return this.name == otherPlayer.name
    }
}

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

    getPlayerLatestScore(player: Player) {
        return this.getPlayerScores(player).reduce((acc, s) => acc.getRound() > s.getRound() ? acc : s)
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

export class GameStorage {
    private store: Storage

    constructor() {
        this.store = new Storage()
    }

    create() {
        return this.store.create()
    }

    add(value: Game) {
        return this.set(value.signature(), value)
    }

    async getGames(type?: GameType) {
        const keys = await this.keys()
        let games = []

        for (const key of keys) {
            const game = await this.get(key)

            if (type != null && game.getType() != type) {
                continue
            }

            games.push(game)
        }

        return games
    }

    async addPlayer(playerName: string, game: Game) {
        const key = game.signature()
        const updatedGame = await this.get(key)
        updatedGame.addPlayer(playerName)
        await this.set(key, updatedGame)
    }

    async addToPlayerScore(scoreToAdd: number, player: Player, game: Game) {
        const key = game.signature()
        const updatedGame = await this.get(key)
        const playerScores = updatedGame.getPlayerScores(player)

        if (playerScores.length == 0) {
            return
        }

        const latestScore = updatedGame.getPlayerLatestScore(player)
        const newScore = latestScore!.getScore() + scoreToAdd
        const newRound = latestScore!.getRound() + 1
        updatedGame.addToPlayerScore(player, newRound, newScore)

        await this.set(key, updatedGame)
    }

    async remove(game: Game) {
        return this.store.remove(game.signature())
    }

    private async get(key: string) {
        const game = await this.store.get(key)
        let scores: Score[] = []

        for (const score of game.scores) {
            scores.push(new Score(new Player(score.player.name),score.score,score.round))
        }

        return new Game(game.type, game.gameNumber, scores)
    }

    private set(key: string, value: Game) {
        return this.store.set(key.toString(), value)
    }

    private async keys() {
        return this.store.keys()
    }
}