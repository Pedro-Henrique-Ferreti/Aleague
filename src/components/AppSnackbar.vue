<template>
  <teleport to="body">
    <div class="snackbar-container container">
      <Transition
        name="modal__fade"
        mode="out-in"
      >
        <AppAlert
          v-if="activeSnackbar"
          class="snackbar"
          :type="activeSnackbar.type"
          :message="activeSnackbar.message"
          @click="notificationStore.closeSnackbarNotification"
        />
      </Transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/stores/notificationStore';
import AppAlert from './AppAlert.vue';

const notificationStore = useNotificationStore();
const { activeSnackbar } = storeToRefs(notificationStore);
</script>

<style lang="scss" scoped>
.snackbar-container {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  z-index: $z-index--snackbar-container;
  pointer-events: none;
  .snackbar {
    min-width: 19.5rem;
    box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
    pointer-events: auto;
    @media (min-width: $desktop-up) {
      max-width: 75vw;
    }
  }
}
</style>
