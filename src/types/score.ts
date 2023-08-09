import { useGamesStore } from "@/stores/gameStorage"
import { Game, Player } from "./types"
import { Collection, IdentifiableByID, Sortable, Validator } from "./collection"

export class Score extends IdentifiableByID {
    private _player: Player
    private _score: number
    private _round: number
    private _gameId: number

    static StartingScore = 0
    static StartingRound = 0

    constructor(player: Player, score: number, round: number, gameId: number) {
        const gameStorage = useGamesStore()
        
        super(gameStorage.scores)
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

export class Scores 
    extends Collection<Score>
    implements Sortable<Score> {

    constructor(items?: Score[]) {
        super(items)
    }

    sorted(): Score[] {
        return this.array().sort((a,b) => a.round - b.round)
    }

    filter(game: Game) {
        return new Scores(this.array().filter((s) => s.gameId == game.id))
    }

    findHighestRound(game: Game) {
        return this.filter(game).array().reduce((acc, s) => acc > s.round ? acc : s.round, 0)
    }

    findPlayerScores(game: Game, player: Player) {
        return this.filter(game).array().filter((s) => s.player.equals(player))
    }

    findLatestScore(game: Game, player: Player) {
        const playerScores = this.findPlayerScores(game, player)
        const latestRound = playerScores.reduce((acc, s) => acc > s.round ? acc : s.round, 0)
        return playerScores.find((s) => s.round == latestRound)
    }
}