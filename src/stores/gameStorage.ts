import { Game, GameType } from '@/types/types'
import { defineStore } from 'pinia'
import { Ref, computed, ref, watch } from 'vue'
import { nextId as _nextId } from '../types/id'
import { useGamesPlayersStore } from './gamesPlayerStorage'

export const useGamesStore = defineStore('games', () => {
    const storageKey = "piniaGamesStore"
    const loaded = ref(false)
    const _games: Ref<Game[]> = ref([])
    const gamesPlayersStore = useGamesPlayersStore()

    const initGames = localStorage.getItem(storageKey)
    if (initGames != null && !loaded.value) {
        const parsed = JSON.parse(initGames)
        _games.value = parsed.map((p: any) => Game.parse(p))
        loaded.value = true
    }

    const games = computed(() => _games.value)
    const nextId = computed(() => _nextId(_games.value))

    const sort = () => _games.value = _games.value.sort((a, b) => b.id - a.id)
    const filter = (type: GameType) => _games.value.filter((g) => g.type == type)
    const add = (game: Game) => {
        if (_games.value.find((g) => g.equals(game)) == null) {
            _games.value.push(game)
            sort()
        }
    }
    const remove = (game: Game) => {
        _games.value.splice(_games.value.indexOf(game), 1)
        gamesPlayersStore.remove(game.id)
    }

    watch(_games.value, (old) => {
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