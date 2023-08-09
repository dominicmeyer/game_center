import { useGamesStore } from "@/stores/gameStorage"
import { Player, Score } from "./types"

export class Game {
    private type: GameType
    private id: number
    private players: Set<Player>

    constructor(type: GameType) {
        const gameStorage = useGamesStore()

        this.type = type
        this.id = gameStorage.games.nextId()
        this.players = new Set()
    }

    getType() {
        return this.type
    }

    getId() {
        return this.id
    }

    getPlayers() {
        return Array.from(this.players).sort((a, b) => a.getName().localeCompare(b.getName()))
    }

    getVsText() {
        return this.getPlayers().reduce((acc, p, i) => {
            return i == 0 ? p.getName() : `${acc} vs ${p.getName()}`
        }, "")
    }

    addPlayer(player: Player) {
        this.players.add(player)
    }
}

export enum GameType {
    Qwirkle
}

export class Games {
    private games: Set<Game>

    constructor() {
        this.games = new Set()
    }

    nextId() {
        const highestId: number = Array.from(this.games).reduce((acc, p) => acc > p.getId() ? acc : p.getId(), 0)
        return highestId + 1
    }

    list() {
        return Array.from(this.games).sort((a, b) => a.getId() - b.getId())
    }

    filter(gameType: GameType) {
        return this.list().filter((g) => g.getType() == gameType)
    }

    add(game: Game) {
        if (!this.containsGame(game)) {
            this.games.add(game)
        } 
    }

    remove(game: Game) {
        this.games.delete(game)
    }

    containsGame(game: Game) {
        return this.games.has(game)
    }
}