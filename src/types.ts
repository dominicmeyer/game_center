import { Storage } from "@ionic/storage"

export class Player {
    private name: string

    constructor(name: string) {
        this.name = name
    }

    getName() {
        return this.name
    }
}

export class Score {
    player: Player
    score: number
    round: number

    constructor(player: Player, score?: number, round?: number) {
        this.player = player
        this.score = score == null ? 0 : score
        this.round = round == null ? 1 : round
    }
}

export class Game {
    type: GameType
    gameNumber: number
    scores: Score[]

    constructor(type: GameType, gameNumber: number, scores: Score[]) {
        this.type = type
        this.scores = scores
        this.gameNumber = gameNumber
    }

    equals(game: Game) {
        return this.type == game.type && this.gameNumber == game.gameNumber
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

    public static getType(): GameType {
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

    private set(key: number, value: Game) {
        return this.store.set(key.toString(), value)
    }

    async add(value: Game) {
        const newId = await this.newId()
        await this.set(newId, value)
    }

    async getGames(type?: GameType) {
        const keys = await this.keys()
        let games = []

        for (const key of keys) {
            const game = await this.get(key)

            if (type != null && game.type != type) {
                continue
            }

            games.push(game)
        }

        return games
    }

    private async keys() {
        const keys = await this.store.keys()
        return keys.map((k) => parseInt(k))
    }

    async get(key: number): Promise<Game> {
        const game = await this.store.get(key.toString())
        return new Game(game.type, game.gameNumber, game.scores)
    }

    private async newId() {
        return (await this.keys()).reduce((max, k) => max > k ? max : k, 1) + 1
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
                const latestScore = updatedGame.scores.reduce((acc, s) => s.player.getName() != playerName ? acc : acc == null ? s : acc.round > s.round ? acc : s)
                updatedGame.addToPlayerScore(playerName, latestScore!.round + 1, latestScore!.score + newScore)
                await this.set(key, updatedGame)
            }
        }
    }

    async remove(game: Game) {
        const keys = await this.keys()

        for (const key of keys) {
            if ((await this.get(key)).equals(game)) {
                await this.store.remove(key.toString())
            }
        }
    }
}