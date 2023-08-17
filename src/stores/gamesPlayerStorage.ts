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
    const remove = (gameId?: number, playerId?: number) => {
        if (gameId != null && playerId != null) {
            const i = _playersGames.value.indexOf({
                game: gameId,
                player: playerId
            })
            _playersGames.value.splice(i, 1)
            return
        }

        for (let i = 0; i < _playersGames.value.length; i++) {
            const e = _playersGames.value.at(i)!

            if (gameId != null && gameId == e.game) {
                _playersGames.value.splice(i--, 1)
            }

            if (playerId != null && playerId == e.player) {
                e.player = 0
            }
        }
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