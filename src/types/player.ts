export class Player {
    private name: string

    constructor(name: string) {
        this.name = name
    }

    getName() {
        return this.name
    }

    equals(otherPlayer: Player) {
        return this.name == otherPlayer.name
    }
}