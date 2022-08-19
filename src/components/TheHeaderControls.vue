<template>
  <div class="header-controls">
    <div class="header-controls__buttons">
      <OnClickOutside @trigger="showNotificationsModal = false">
        <div class="header-controls__notifications-wrapper">
          <TheHeaderControlsButton
            icon="bell"
            :is-active="showNotificationsModal"
            @click="showNotificationsModal = !showNotificationsModal"
          />
          <TheHeaderNotificationsModal :show="showNotificationsModal" />
        </div>
      </OnClickOutside>
      <TheHeaderControlsButton
        icon="gear"
        @click="openUserSettingsModal"
      />
    </div>
    <TheHeaderLoggedInUser />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { OnClickOutside } from '@vueuse/components';
import { useUserSettingsStore } from '@/stores/userSettingsStore';
import TheHeaderLoggedInUser from './TheHeaderLoggedInUser.vue';
import TheHeaderControlsButton from './TheHeaderControlsButton.vue';
import TheHeaderNotificationsModal from './TheHeaderNotificationsModal.vue';

const { openModal: openUserSettingsModal } = useUserSettingsStore();

const showNotificationsModal = ref(false);
</script>

<style lang="scss" scoped>
.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &__notifications-wrapper {
    position: relative;
  }
  &__buttons {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.5rem;
  }
  @include for-large-tablet-portrait-up {
    justify-content: flex-end;
    .header-controls__buttons {
      flex-direction: row;
      &:after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 1.75rem;
        background-color: $color--light-gray-1;
        margin: 0 1rem;
      }
    }
  }
  @include for-desktop-up {
    width: auto;
  }
}
</style>
