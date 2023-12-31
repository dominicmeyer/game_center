import { useGamesStore } from "@/stores/gameStorage"
import { Player } from "./player"
import { IdentifiableByID } from "./id"
import { usePlayersStore } from "@/stores/playerStorage"
import { useGamesPlayersStore } from "@/stores/gamesPlayerStorage"

export class Game extends IdentifiableByID {
    private _typeId: number

    constructor(typeId: number) {
        super(useGamesStore())
        this._typeId = typeId
    }

    static parse(p: {_typeId: number, _id: number}) {
        const game = new Game(p._typeId)
        game.parse(p._id)
        return game
    }

    get typeId() {
        return this._typeId
    }

    get players() {
        return this.fetchPlayers().sort((a, b) => a.name.localeCompare(b.name))
    }

    vsText() {
        return this.players.reduce((acc, p, i) => {
            return i == 0 ? p.name : `${acc} vs ${p.name}`
        }, "")
    }

    add(player: Player) {
        useGamesPlayersStore().add(this.id, player.id)
    }

    private fetchPlayers() {
        const playersStorage = usePlayersStore()
        const playerIds = useGamesPlayersStore().filter(this.id)
        return playersStorage.players.filter((p) => playerIds.find(({ game, player }) => p.id == player))
    }
}