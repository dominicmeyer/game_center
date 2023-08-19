<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title><span @click="router.push('/settings')">Einstellungen ></span> Spiele-Arten</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Spiele-Arten</ion-title>
                </ion-toolbar>
            </ion-header>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter()
</script>