<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ game.getVsText() }}</ion-card-title>
            <ion-card-subtitle>Spiel-Nr.: {{ game.getId() }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>

        </ion-card-content>
    </ion-card>
</template>
  
<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import Button, { ButtonType } from './Button.vue';
import { Game } from '@/types/types';

export default {
    setup() {
        return {

        }
    },
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, Button },
    props: {
        game: {
            type: Game,
            required: true
        },
    },
    methods: {

    },
}
</script>