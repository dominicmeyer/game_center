<template>
    <ion-modal :is-open="isOpen" @willDismiss="emit('close')">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <Button @click="emit('close')" :type="ButtonType.Close" />
                </ion-buttons>
                <ion-title>{{ title }}</ion-title>
                <ion-buttons slot="end">
                    <Button @click="emit('submit')" :type="ButtonType.Save" />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <slot></slot>
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonContent, IonToolbar, IonHeader, IonButtons, IonTitle } from '@ionic/vue';
import Button, { ButtonType } from '../Button.vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true
    }
})

const emit = defineEmits<{
    (event: "close"): void
    (event: "submit"): void
}>()
</script>