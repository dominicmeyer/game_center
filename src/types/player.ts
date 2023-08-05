import { useGamesStore } from "@/stores/gameStorage"

export class Player {
    private name: string
    private id: number

    constructor(name: string) {
        const gameStorage = useGamesStore()

        this.name = name
        this.id = gameStorage.nextPlayerId
    }

    getName() {
        return this.name
    }

    getId() {
        return this.id
    }

    equals(otherPlayer: Player) {
        return this.name == otherPlayer.name
    }
}

export class Players {
    private players: Set<Player>

    constructor() {
        this.players = new Set()
    }

    nextPlayerId() {
        const highestId: number = Array.from(this.players).reduce((acc, p) => acc > p.getId() ? acc : p.getId(), 0)
        return highestId + 1
    }

    get() {
        return Array.from(this.players).sort((a, b) => a.getName().localeCompare(b.getName()))
    }

    add(player: Player) {
        this.players.add(player)
    }

    containsName(name: string) {
        return Array.from(this.players).reduce((acc, p) => acc || p.getName() == name, false)
    }
}