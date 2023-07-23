<template>
  <Suspense>
    <ion-app>
    <ion-router-outlet />
  </ion-app>
  </Suspense>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Suspense } from 'vue';
</script>
