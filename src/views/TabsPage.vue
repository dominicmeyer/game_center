<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="games" href="/games">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Spiele</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="players" href="/players">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Spieler</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label>Einstellungen</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { square, person, settings } from 'ionicons/icons';
</script>
