<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Spieler</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Spieler</ion-title>
                </ion-toolbar>
            </ion-header>

            <input type="text" v-model="addPlayerName" placeholder="Name des Spielers">
            <Button @click="addPlayer" :type="ButtonType.Add" />

            <ion-item v-for="player in gamesStore.getPlayers()">
                <h1>Spieler/in: {{ player.getName() }}</h1>
            </ion-item>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton } from '@ionic/vue';
import Button, { ButtonType } from '@/components/Button.vue';
import { useGamesStore } from "@/stores/gameStorage" 
import { Player } from "@/types/types"

export default {
    setup() {
        const gamesStore = useGamesStore()
        const addPlayerName = ""

        return {
            ButtonType,
            addPlayerName,
            gamesStore
        }
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton, Button
    },
    methods: {
        addPlayer() {
            const newPlayer = new Player(this.addPlayerName)

            this.gamesStore.addPlayer(newPlayer)
        },
    },
}
</script>