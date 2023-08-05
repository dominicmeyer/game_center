import { useGamesStore } from "@/stores/gameStorage"

export class Player {
    private name: string
    private id: number

    constructor(name: string) {
        const gameStorage = useGamesStore()

        this.name = name
        this.id = gameStorage.players.nextId()
    }

    getName() {
        return this.name
    }

    setName(newName: string) {
        this.name = newName
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

    nextId() {
        const highestId: number = Array.from(this.players).reduce((acc, p) => acc > p.getId() ? acc : p.getId(), 0)
        return highestId + 1
    }

    list() {
        return Array.from(this.players).sort((a, b) => a.getName().localeCompare(b.getName()))
    }

    add(player: Player) {
        if (this.containsName(player.getName())) {
            alert(`Es gibt bereits einen Spieler/in mit dem Namen ${player.getName()}`)
        } else {
            this.players.add(player)
        }
    }

    remove(player: Player) {
        this.players.delete(player)
    }

    rename(player: Player, newName: string): Player {
        if (this.containsName(newName) && player.getName() != newName) {
            alert(`Es gibt bereits einen Spieler/in mit dem Namen ${newName}`)
        } else {
            this.remove(player)
            player.setName(newName)
            this.add(player)
        }
        return player
    }

    containsName(name: string) {
        return Array.from(this.players).reduce((acc, p) => acc || p.getName() == name, false)
    }
}