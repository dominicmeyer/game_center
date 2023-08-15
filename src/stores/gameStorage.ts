import { Game, GameType } from '@/types/types'
import { defineStore } from 'pinia'
import { Ref, computed, ref, watch } from 'vue'
import { nextId as _nextId } from '../types/id'

export const useGamesStore = defineStore('games', () => {
    const storageKey = "piniaGamesStore"
    const loaded = ref(false)
    const _games: Ref<Game[]> = ref([])

    const initGames = localStorage.getItem(storageKey)
    if (initGames != null && !loaded.value) {
        const parsed = JSON.parse(initGames)
        _games.value = parsed.map((p: any) => Game.parse(p))
        loaded.value = true
    }

    const games = computed(() => _games)
    const nextId = computed(() => _nextId(_games.value))

    const sort = () => _games.value = _games.value.sort((a, b) => b.id - a.id)
    const filter = (type: GameType) => {console.log("GameType: " + type + " Filtering: " + _games.value.filter((g) => {console.log("Interal filter Type: " + g.type) ;return g.type == type})) ;return _games.value.filter((g) => g.type == type)}
    const add = (game: Game) => {
        if (_games.value.find((g) => g.equals(game)) == null) {
            _games.value.push(game)
        }
    }
    const remove = (game: Game) => {
        _games.value = _games.value.filter((p) => !p.equals(game))
    }

    watch(_games.value, (old) => {
        sort()
        localStorage.setItem(storageKey, JSON.stringify(_games.value))
    })

    return {
        games,
        nextId,
        filter,
        add,
        remove
    }
})