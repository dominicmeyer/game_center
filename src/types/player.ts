import { IdentifiableByID } from "../stores/collection"
import { usePlayersStore } from "@/stores/playerStorage"

export class Player 
    extends IdentifiableByID {

    name: string

    constructor(name: string) {
        super(usePlayersStore())
        this.name = name
    }
}