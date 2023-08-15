import { useGamesStore } from "@/stores/gameStorage"
import { Player } from "./types"
import { IdentifiableByID } from "./id"
import { usePlayersStore } from "@/stores/playerStorage"
import { useGamesPlayersStore } from "@/stores/gamesPlayerStorage"

export class Game extends IdentifiableByID {
    private _type: GameType
    private playersGamesStorage = useGamesPlayersStore()

    constructor(type: GameType) {
        super(useGamesStore())
        this._type = type
    }

    static parse(p: {_type: GameType, _id: number}) {
        const game = new Game(p._type)
        game.parse(p._id)
        return game
    }

    get type() {
        return this._type
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
        this.playersGamesStorage.add(this.id, player.id)
    }

    private fetchPlayers() {
        const playersStorage = usePlayersStore()
        const playerIds = this.playersGamesStorage.filter(this.id)
        return playersStorage.players.filter((p) => playerIds.find(({ game, player }) => p.id == player))
    }
}

export enum GameType {
    Qwirkle
}