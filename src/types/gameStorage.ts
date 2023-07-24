import { Game, GameType, Player, Score } from "./types"
import { Storage } from "@ionic/storage"

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

        const latestScore = updatedGame.getLatestScore(player)
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
            scores.push(new Score(new Player(score.player.name), score.score, score.round))
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