import { useGameTypesStore } from "@/stores/gameTypeStorage";
import { IdentifiableByID } from "./id";

export class GameType extends IdentifiableByID {
    private _name: string

    constructor(name: string) {
        const gameTypesStore = useGameTypesStore()

        super(gameTypesStore)
        this._name = name
    }

    static parse(p: {_name: string, _id: number}) {
        const gameType = new GameType(p._name)
        gameType.parse(p._id)
        return gameType
    }

    get name() {
        return this._name
    }
}

export const qwirkleGameType = () => {
    return GameType.parse({
        _name: "Qwirkle",
        _id: 0
    })
}