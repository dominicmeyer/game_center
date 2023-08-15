import { IdentifiableByID } from "./id"
import { useScoresStore } from "@/stores/scoreStorage"

export class Score extends IdentifiableByID {
    private _playerId: number
    private _score: number
    private _round: number
    private _gameId: number

    static StartingScore = 0
    static StartingRound = 0

    constructor(playerId: number, score: number, round: number, gameId: number) {
        super(useScoresStore())
        this._playerId = playerId
        this._score = score
        this._round = round
        this._gameId = gameId
    }

    static parse(p: {_playerId: number, _score: number, _round: number, _gameId: number, _id: number}) {
        const _score = new Score(p._playerId, p._score, p._round, p._gameId)
        _score.parse(p._id)
        return _score
    }

    get playerId() {
        return this._playerId
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