import { Player } from "./types"
import { IdentifiableByID } from "../stores/collection"
import { useScoresStore } from "@/stores/scoreStorage"

export class Score extends IdentifiableByID {
    private _player: Player
    private _score: number
    private _round: number
    private _gameId: number

    static StartingScore = 0
    static StartingRound = 0

    constructor(player: Player, score: number, round: number, gameId: number) {
        super(useScoresStore())
        this._player = player
        this._score = score
        this._round = round
        this._gameId = gameId
    }

    get player() {
        return this._player
    }

    get score() {
        return this._score
    }

    get round() {
        return this._round
    }

    get gameId() {
        return this._gameId
    }
}