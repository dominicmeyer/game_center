import { Game, GameType } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Collection, Sortable } from './collection'

export const useGamesStore = defineStore('games', () => {
    const games = ref(new Games())

    return games
})

export class Games 
    extends Collection<Game>
    implements Sortable<Game> {

    constructor(items?: Game[] ) {
        super(items)
    }

    sorted(): Game[] {
        return this.array().sort((a,b) => b.id - a.id)
    }

    filter(gameType: GameType) {
        return new Games(this.array().filter((g) => g.type == gameType))
    }
}