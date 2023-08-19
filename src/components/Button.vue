<template>
  <ion-button>
    <ion-icon slot="icon-only" :icon="icon" shape="round"></ion-icon>
  </ion-button>
</template>
  
<script lang="ts">
export enum ButtonType {
  Delete, Add, Close, Save, Edit
}
</script>

<script lang="ts" setup>
import { IonButton, IonIcon } from '@ionic/vue';
import { PropType, ref } from 'vue';
import { trashOutline, addOutline, closeOutline, saveOutline, squareOutline, pencilOutline } from 'ionicons/icons';

const props = defineProps({
  type: {
    type: Number as PropType<ButtonType>,
    required: true
  }
})

const icon = ref("")

switch (props.type) {
  case ButtonType.Add:
    icon.value = addOutline
    break;
  case ButtonType.Delete:
    icon.value = trashOutline
    break;
  case ButtonType.Close:
    icon.value = closeOutline
    break;
  case ButtonType.Save:
    icon.value = saveOutline
    break;
  case ButtonType.Edit:
    icon.value = pencilOutline
    break;
  default:
    icon.value = squareOutline
    break;
}
</script>