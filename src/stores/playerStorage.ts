import { nextId as _nextId } from "@/types/id"
import { Player } from "@/types/types"
import { defineStore } from "pinia"
import { Ref, computed, ref, watch } from "vue"
import { useGamesPlayersStore } from "./gamesPlayerStorage"
import { deletedPlayer } from "@/types/player"

export const usePlayersStore = defineStore("players", () => {
    const storageKey = "piniaPlayersStore"
    const loaded = ref(false)
    const _players: Ref<Player[]> = ref([])
    const gamesPlayersStore = useGamesPlayersStore()

    const initPlayers = localStorage.getItem(storageKey)
    if (initPlayers != null && !loaded.value) {
        const parsed: Player[] = JSON.parse(initPlayers)
        _players.value = parsed.map((p: any) => Player.parse(p))
        loaded.value = true
    }

    const players = computed(() => _players.value)
    const nextId = computed(() => _nextId(_players.value))

    const sort = () => _players.value = _players.value.sort((a, b) => a.name.localeCompare(b.name))
    const findPlayer = (name: string) => _players.value.find((p) => p.name == name)
    const add = (player: Player) => {
        if (findPlayer(player.name) == null) {
            _players.value.push(player)
            sort()
        }
    }
    const remove = (player: Player) => {
        _players.value.splice(_players.value.indexOf(player), 1)
        gamesPlayersStore.remove(undefined, player.id)
    }
    const validate = (name: string) => {
        const contains = findPlayer(name) != null
        if (contains) {
            alert(`Es gibt bereits einen Spieler/in mit dem Namen ${name}`)
        }
        return !contains
    }
    const renamePlayer = (oldName: string, newName: string) => {
        const player = findPlayer(oldName)!
        remove(player)
        player.name = newName
        add(player)
    }

    watch(_players.value, (old) => {
        localStorage.setItem(storageKey, JSON.stringify(_players.value))
    })

    if (!_players.value.includes(deletedPlayer())) {
        add(deletedPlayer())
    }

    return {
        players,
        nextId,
        findPlayer,
        add,
        remove,
        validate,
        renamePlayer
    }
})