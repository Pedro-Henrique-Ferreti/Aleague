<template>
  <teleport to="body">
    <div class="snackbar-container container">
      <AppTransition name="modal__fade">
        <AppAlert
          v-if="activeSnackbar"
          class="snackbar"
          :type="activeSnackbar.type"
          :message="activeSnackbar.message"
          @click="notificationStore.closeSnackbarNotification"
        />
      </AppTransition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/stores/notification';
import AppAlert from './AppAlert.vue';
import AppTransition from './AppTransition.vue';

const notificationStore = useNotificationStore();
const { activeSnackbar } = storeToRefs(notificationStore);
</script>

<style lang="scss" scoped>
.snackbar-container {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  z-index: $z-index--snackbar-container;
  pointer-events: none;
  .snackbar {
    max-width: 30rem;
    box-shadow: $shadow--large;
    pointer-events: auto;
  }
}
</style>
