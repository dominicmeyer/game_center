import { defineStore } from 'pinia'
import { Ref, computed, ref, watch } from 'vue'
import { nextId as _nextId } from '../types/id'
import { Score } from '@/types/score'
import { Game } from '@/types/game'
import { Player } from '@/types/player'

export const useScoresStore = defineStore('scores', () => {
    const storageKey = "piniaScoresStore"
    const loaded = ref(false)
    const _scores: Ref<Score[]> = ref([])

    const initScores = localStorage.getItem(storageKey)
    if (initScores != null && !loaded.value) {
        const parsed = JSON.parse(initScores)
        _scores.value = parsed.map((p: any) => Score.parse(p))
        loaded.value = true
    }

    const scores = computed(() => _scores.value)
    const nextId = computed(() => _nextId(_scores.value))

    const sort = () => _scores.value = _scores.value.sort((a, b) => a.round - b.round)
    const filter = (game: Game, player?: Player) => _scores.value.filter((s) => s.gameId == game.id && (player == null || player.id == s.playerId))
    const highestRound = (game: Game) => filter(game).reduce((acc, s) => acc > s.round ? acc : s.round, 0)
    const latestScore = (game: Game, player: Player) => filter(game, player).reduce((acc: Score | null, s) => acc == null ? s : acc.round > s.round ? acc : s, null)
    const add = (score: Score) => {
        if (_scores.value.find((s) => s === score) == null) {
            _scores.value.push(score)
            sort()
        }
    }
    const remove = (score: Score) => {
        _scores.value.splice(_scores.value.indexOf(score), 1)
    }

    watch(_scores.value, (old) => {
        localStorage.setItem(storageKey, JSON.stringify(_scores.value))
    })

    return {
        scores,
        nextId,
        filter,
        highestRound,
        latestScore,
        add,
        remove
    }
})