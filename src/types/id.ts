export class IdentifiableByID {
    private _id: number
    constructor(idProvider: IdProvider) {
        this._id = idProvider.nextId
    }
    parse(id: number) {
        this._id = id
    }
    get id() {
        return this._id
    }
    equals(other: IdentifiableByID) {
        return this._id == other._id
    }
}

export interface IdProvider {
    nextId: number
}

export interface DefaultCollection<T extends IdentifiableByID> {
    nextId(): number
    add(value: T): void
    remove(value: T): void
}

export function nextId<T extends IdentifiableByID>(from: T[]) {
    const highestId: number = from.reduce((acc, p) => acc > p.id ? acc : p.id, 0)
    return highestId + 1
}