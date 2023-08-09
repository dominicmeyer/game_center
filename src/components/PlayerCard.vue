<template>
    <div v-show="!openRename">
        <h1>Spieler/in: <span>{{ playerName }}</span></h1>
        <Button @click="removePlayer" :type="ButtonType.Delete" />
        <Button @click="startRename" :type="ButtonType.Edit" />
    </div>
    <div v-show="openRename">
        <h1>Spieler/in:
            <input type="text" v-model="playerName" @keyup.enter="renamePlayer">
        </h1>
        <Button @click="cancelRename" :type="ButtonType.Close" />
        <Button @click="renamePlayer" :type="ButtonType.Save" />
    </div>
</template>

<script lang="ts" setup>
import Button, { ButtonType } from '@/components/Button.vue';
import { useGamesStore } from "@/stores/gameStorage"
import { Player } from "@/types/types"
import { ref } from 'vue';

const props = defineProps({
    player: {
        type: Player,
        required: true,
    }
})

const emit = defineEmits({
    delete: () => true
})

const gamesStore = useGamesStore()
const openRename = ref(false)
const playerName = ref(props.player.name)
const oldPlayerName = ref(props.player.name)

const startRename = () => {
    openRename.value = true
}
const cancelRename = () => {
    openRename.value = false
    playerName.value = oldPlayerName.value
}
const removePlayer = () => {
    gamesStore.players.remove(props.player)
    emit("delete")
}
const renamePlayer = () => {
    if (playerName.value != oldPlayerName.value) {
        if (!gamesStore.players.validate(playerName.value)) {
            return
        }
        gamesStore.players.renamePlayer(oldPlayerName.value, playerName.value)
    }
    oldPlayerName.value = playerName.value
    openRename.value = false
}
</script>