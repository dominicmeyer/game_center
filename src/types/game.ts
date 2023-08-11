import { useGamesStore } from "@/stores/gameStorage"
import { Player, Score } from "./types"
import { Collection, IdentifiableByID, Sortable } from "../stores/collection"

export class Game extends IdentifiableByID {
    private _type: GameType
    private _players: Set<Player>

    constructor(type: GameType) {
        super(useGamesStore())
        this._type = type
        this._players = new Set()
    }

    get type() {
        return this._type
    }

    get players() {
        return Array.from(this._players).sort((a, b) => a.name.localeCompare(b.name))
    }

    vsText() {
        return this.players.reduce((acc, p, i) => {
            return i == 0 ? p.name : `${acc} vs ${p.name}`
        }, "")
    }

    add(player: Player) {
        this._players.add(player)
    }
}

export enum GameType {
    Qwirkle
}