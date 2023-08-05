<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="qwirkle" href="/games/qwirkle">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Qwirkle</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="qwirkle" href="/games/players">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Spieler</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { square, person } from 'ionicons/icons';
</script>
