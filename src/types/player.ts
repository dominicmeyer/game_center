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