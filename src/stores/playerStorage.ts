import { Collection, Validator } from '@/stores/collection'
import { Player } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayersStore = defineStore('players', () => {
    const players = ref(new Players())

    return players
})

export class Players
    extends Collection<Player>
    implements Validator<string> {

    constructor() {
        super()
    }

    validate(name: string) {
        const contains = this.array().reduce((acc, p) => acc || p.name === name, false)
        if (contains) {
            alert(`Es gibt bereits einen Spieler/in mit dem Namen ${name}`)
        }
        return !contains
    }

    renamePlayer(oldName: string, newName: string) {
        const player = this.array().find((p) => p.name == oldName)!
        this.remove(player)
        player.name = newName
        this.add(player)
    }
}