import { defineStore } from "pinia"
import { Ref, ref, watch } from "vue"

export const useGamesPlayersStore = defineStore('gamesPlayers', () => {
    const storageKey = "piniaGamesPlayersStore"
    const loaded = ref(false)
    const _playersGames: Ref<{ game: number, player: number }[]> = ref([])

    const initGames = localStorage.getItem(storageKey)
    if (initGames != null && !loaded.value) {
        const parsed = JSON.parse(initGames)
        _playersGames.value = parsed
        loaded.value = true
    }

    const filter = (gameId: number) => _playersGames.value.filter(({ game, player }) => gameId == game)
    const add = (gameId: number, playerId: number) => {
        if (_playersGames.value.find(({ game, player }) => game == gameId && player == playerId) == null) {
            _playersGames.value.push({ game: gameId, player: playerId })
        }
    }
    const remove = (gameId: number, playerId: number) => {
        _playersGames.value = _playersGames.value.filter(({ game, player }) => !(game == gameId && player == playerId))
    }

    watch(_playersGames.value, (old) => {
        localStorage.setItem(storageKey, JSON.stringify(_playersGames.value))
    })

    return {
        filter,
        add,
        remove
    }
})