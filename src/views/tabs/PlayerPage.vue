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

            <div :key="listKey">
                <ion-item v-for="player in playerStore.players.filter((p) => p.id != 0)">
                    <PlayerCard :player="player" @delete="listKey++" />
                </ion-item>
            </div>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem } from '@ionic/vue';
import Button, { ButtonType } from '@/components/Button.vue';
import { Player } from "@/types/player"
import PlayerCard from '@/components/cards/PlayerCard.vue';
import { ref } from 'vue';
import { playerNameAlert, usePlayersStore } from '@/stores/playerStorage';

const playerStore = usePlayersStore()

const addPlayerName = ref("")
const listKey = ref(0)

const addPlayer = () => {
    if (!playerStore.validate(addPlayerName.value)) {
        playerNameAlert(addPlayerName.value)
        return
    }

    playerStore.add(new Player(addPlayerName.value))
    addPlayerName.value = ""
    listKey.value++
}
</script>