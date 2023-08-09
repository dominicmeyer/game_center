import { useGamesStore } from "@/stores/gameStorage"
import { Collection, IdentifiableByID, Sortable, Validator } from "./collection"

export class Player extends IdentifiableByID {
    name: string

    constructor(name: string) {
        const gameStorage = useGamesStore()

        super(gameStorage.players)
        this.name = name
    }
}

export class Players
    extends Collection<Player>
    implements Sortable<Player>, Validator<Player> {

    constructor() {
        super()
    }

    sorted(): Player[] {
        return this.array().sort((a, b) => a.name.localeCompare(b.name))
    }

    validate(value: Player) {
        const contains = this.containsName(value.name)
        if (contains) {
            alert(`Es gibt bereits einen Spieler/in mit dem Namen ${name}`)
        }
        return !contains
    }

    renamePlayer(oldName: string, newName: string) {
        const player = this.array().find((p) => p.name == oldName)!
        this.remove(player)
        player.name = newName
        this.add(player)
    }

    private containsName(name: string) {
        return this.array().reduce((acc, p) => acc || p.name == name, false)
    }
}