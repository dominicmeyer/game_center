import { IdentifiableByID } from "./id"
import { usePlayersStore } from "@/stores/playerStorage"

export class Player 
    extends IdentifiableByID {

    name: string

    constructor(name: string) {
        const store = usePlayersStore()

        super(store)
        this.name = name
    }

    static parse(p: {name: string, _id: number}) {
        const player = new Player(p.name)
        player.parse(p._id)
        return player
    }
}

export const deletedPlayer = () => {
    const player = new Player("Gelöschter Spieler")
    player.parse(0)
    return player
}