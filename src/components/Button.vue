<template>
  <ion-button>
    <ion-icon slot="icon-only" :icon="icon" shape="round"></ion-icon>
  </ion-button>
</template>
  
<script lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { trashOutline, addOutline, closeOutline, saveOutline, squareOutline } from 'ionicons/icons';

export enum ButtonType {
  Delete, Add, Close, Save
}

export default defineComponent({
  components: { IonButton, IonIcon },
  props: {
    type: {
      type: Number as PropType<ButtonType>,
      required: true
    }
  },
  setup(props) {
    let icon

    switch (props.type) {
      case ButtonType.Add:
        icon = addOutline
        break;
      case ButtonType.Delete:
        icon = trashOutline
        break;
      case ButtonType.Close:
        icon = closeOutline
        break;
      case ButtonType.Save:
        icon = saveOutline
        break;
      default:
        icon = squareOutline
        break;
    }

    return { icon };
  },
});
</script>