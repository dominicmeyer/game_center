export class IdentifiableByID {
    private _id: number
    constructor(idProvider: IdProvider) {
        this._id = idProvider.nextId()
    }
    get id() {
        return this._id
    }
    equals(other: IdentifiableByID) {
        return this._id != other._id
    }
}

export interface IdProvider {
    nextId(): number
}

export interface Sortable<T> {
    sorted(): T[]
}

export interface Validator<T> {
    validate(value: T): boolean
}

export interface DefaultCollection<T extends IdentifiableByID> {
    nextId(): number
    array(): T[]
    add(value: T): void
    remove(value: T): void
}

export class Collection<T extends IdentifiableByID> 
    implements DefaultCollection<T>, IdProvider {
        
    private items: Set<T>

    constructor() {
        this.items = new Set()
    }
    nextId(): number {
        const highestId: number = this.array().reduce((acc, p) => acc > p.id ? acc : p.id, 0)
        return highestId + 1
    }
    array(): T[] {
        return Array.from(this.items)
    }
    add(value: T): void {
        this.items.add(value)
    }
    remove(value: T): void {
        this.items.delete(value)
    }
}