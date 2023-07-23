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

    addPlayer(name: string) {
        this.scores.push(new Score(new Player(name)))
    }

    addToPlayerScore(name: string, round: number, newScore: number) {
        this.scores.push(new Score(new Player(name), newScore, round))
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

    async add(value: Game) {
        await this.set(value.signature(), value)
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
        const keys = await this.keys()

        for (const key of keys) {
            if ((await this.get(key)).equals(game)) {
                const updatedGame = await this.get(key)
                updatedGame.addPlayer(playerName)
                await this.set(key, updatedGame)
            }
        }
    }

    async addToPlayerScore(newScore: number, playerName: string, game: Game) {
        const keys = await this.keys()

        for (const key of keys) {
            if ((await this.get(key)).equals(game)) {
                const updatedGame = await this.get(key)
                const latestScore = updatedGame.getScores().reduce((acc, s) => s.getPlayer().getName() != playerName ? acc : acc == null ? s : acc.getRound() > s.getRound() ? acc : s)
                updatedGame.addToPlayerScore(playerName, latestScore!.getRound() + 1, latestScore!.getScore() + newScore)
                await this.set(key, updatedGame)
            }
        }
    }

    async remove(game: Game) {
        return this.store.remove(game.signature())
    }

    private async get(key: string) {
        const game = await this.store.get(key)
        return new Game(game.type, game.gameNumber, game.scores)
    }

    private set(key: string, value: Game) {
        return this.store.set(key.toString(), value)
    }

    private async keys() {
        return this.store.keys()
    }
}