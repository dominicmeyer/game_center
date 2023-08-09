<template>
    <div :key="cardKey">
        <div v-if="!renamePlayerStatus">
            <h1>Spieler/in: <span>{{ playerName }}</span></h1>
            <Button @click="removePlayer" :type="ButtonType.Delete" />
            <Button @click="startRenamingPlayer" :type="ButtonType.Edit" />
        </div>
        <div v-if="renamePlayerStatus">
            <h1>Spieler/in: 
                <input type="text" v-model="playerName" @keyup.enter="renamePlayer">
            </h1>
            <Button @click="cancelRenamingPlayer" :type="ButtonType.Close" />
            <Button @click="renamePlayer" :type="ButtonType.Save" />
        </div>
    </div>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton } from '@ionic/vue';
import Button, { ButtonType } from '@/components/Button.vue';
import { useGamesStore } from "@/stores/gameStorage" 
import { Player } from "@/types/types"
import { ref } from 'vue';

export default {
    setup(props) {
        return {
            gamesStore: useGamesStore(),
            renamePlayerStatus: false,
            playerName: props.player.name,
            oldPlayerName: props.player.name,
            cardKey: ref(0)
        }
    },
    methods: {
        rerenderCard() {
            this.cardKey++
        },
        removePlayer() {
            this.gamesStore.players.remove(this.player)
        },
        startRenamingPlayer() {
            this.oldPlayerName = this.playerName
            this.renamePlayerStatus = true
            this.rerenderCard()
        },
        cancelRenamingPlayer() {
            this.playerName = this.oldPlayerName
            this.closeRenamingPlayer()
        },
        closeRenamingPlayer() {
            this.renamePlayerStatus = false
            this.rerenderCard()
        },
        renamePlayer() {
            if (this.playerName != this.oldPlayerName) {
                if (!this.gamesStore.players.validate(this.playerName)) {
                    this.player.name = this.oldPlayerName
                    return
                }
                this.gamesStore.players.renamePlayer(this.oldPlayerName, this.playerName)
            }
            this.closeRenamingPlayer()
        }
    },
    data() {
        return {
            ButtonType
        }
    },
    props: {
        player: {
            type: Player,
            required: true,
        }
    },
    components: {
        IonPage, 
        IonHeader, 
        IonToolbar, 
        IonTitle, 
        IonContent, 
        IonButtons, 
        IonItem, 
        IonButton, 
        Button
    },
}
</script>