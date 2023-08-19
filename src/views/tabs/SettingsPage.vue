<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Einstellungen</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Einstellungen</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-item @click="router.push('/settings/game_types')">Spiele-Arten</ion-item>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter()
</script>