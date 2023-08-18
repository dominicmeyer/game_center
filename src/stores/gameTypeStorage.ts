import { GameType, qwirkleGameType } from "@/types/gameType";
import { defineStore } from "pinia";
import { Ref, computed, ref, watch } from "vue";
import { nextId as _nextId } from "@/types/id";

export const useGameTypesStore = defineStore("gameTypes", () => {
    const storageKey = "piniaGameTypesStore"
    const loaded = ref(false)
    const _gameTypes: Ref<GameType[]> = ref([])

    const initGames = localStorage.getItem(storageKey)
    if (initGames != null && !loaded.value) {
        const parsed = JSON.parse(initGames)
        _gameTypes.value = parsed.map((p: any) => GameType.parse(p))
        loaded.value = true
    }

    const gameTypes = computed(() => _gameTypes.value)
    const nextId = computed(() => _nextId(_gameTypes.value))

    const sort = () => _gameTypes.value = _gameTypes.value.sort((a, b) => b.id - a.id)
    const add = (gameType: GameType) => {
        if (_gameTypes.value.find((g) => g.equals(gameType)) == null) {
            _gameTypes.value.push(gameType)
            sort()
        }
    }
    const remove = (gameType: GameType) => {
        _gameTypes.value.splice(_gameTypes.value.indexOf(gameType), 1)
    }

    watch(_gameTypes.value, (old) => {
        localStorage.setItem(storageKey, JSON.stringify(_gameTypes.value))
    })

    if (!_gameTypes.value.includes(qwirkleGameType())) {
        add(qwirkleGameType())
    }

    return {
        gameTypes,
        nextId,
        add,
        remove
    }
})