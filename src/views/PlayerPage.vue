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

        <input @keyup.enter="addPlayer" type="text" v-model="addPlayerName" placeholder="Name des Spielers">
            <Button @click="addPlayer" :type="ButtonType.Add" />

            <ion-item v-for="player in gamesStore.players.list()">
                <PlayerCard :player="player" />
            </ion-item>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton } from '@ionic/vue';
import Button, { ButtonType } from '@/components/Button.vue';
import { useGamesStore } from "@/stores/gameStorage" 
import { Player } from "@/types/types"
import PlayerCard from '@/components/PlayerCard.vue';

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
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonButton, Button, PlayerCard
    },
    methods: {
        addPlayer() {
            const newPlayer = new Player(this.addPlayerName)
            this.addPlayerName = ""

            this.gamesStore.players.add(newPlayer)
        }
    },
}
</script>