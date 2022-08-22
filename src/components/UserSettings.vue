<template>
  <AppModal
    render-footer
    title="Configurações"
    size="large"
    :show="userSettingsStore.showModal"
    :is-loading="isLoading"
    :disable-save-button="!profileHasUnsavedChanges"
    @close="closeModal"
    @cancel-action="closeModal"
    @save-action="handleSaveSettings"
  >
    <template #tabPanel>
      <div class="user-settings__tab-panel">
        <UserSettingsTabButton
          v-for="tab in Object.values(userSettingsTabs)"
          :key="tab.id"
          :is-active="tab.id === activeTabId"
          @click="activeTabId = tab.id"
        >
          {{ tab.name }}
        </UserSettingsTabButton>
      </div>
    </template>
    <component :is="activeTab?.component" />
  </AppModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserSettingsStore } from '@/stores/userSettingsStore';
import { useNotificationStore } from '@/stores/notificationStore';
import AppModal from './AppModal.vue';
import UserSettingsTabButton from './UserSettingsTabButton.vue';
import UserSettingsProfile from './UserSettingsProfile.vue';
import UserSettingsChangePassword from './UserSettingsChangePassword.vue';

const userSettingsStore = useUserSettingsStore();
const { openSnackbarNotification } = useNotificationStore();

const { closeModal, setProfileInfo } = userSettingsStore;
const { profileHasUnsavedChanges } = storeToRefs(userSettingsStore);

// Tabs
const userSettingsTabs = {
  profile: {
    id: 1,
    name: 'Meu Perfil',
    component: UserSettingsProfile,
  },
  changePassword: {
    id: 2,
    name: 'Alterar Senha',
    component: UserSettingsChangePassword,
  },
};
const activeTabId = ref(userSettingsTabs.profile.id);

const activeTab = computed(
  () => Object.values(userSettingsTabs).find(({ id }) => id === activeTabId.value),
);

watch(() => activeTabId.value, resetTab);

function resetTab(_: number, lastActiveTabId: number) {
  if (lastActiveTabId === userSettingsTabs.profile.id) {
    setProfileInfo();
  }
}

// Save settings
const isLoading = ref(false);

async function handleSaveSettings() {
  if (profileHasUnsavedChanges.value) {
    saveProfileInfo();
  }
}

async function saveProfileInfo() {
  isLoading.value = true;
  try {
    await userSettingsStore.saveProfileInfo();

    openSnackbarNotification({
      message: 'As alterações foram salvas com sucesso.',
    });
  } catch (error: Error) {
    openSnackbarNotification({
      message: 'Falha ao salvar as alterações. Por favor, tente novamente.',
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.user-settings {
  &__tab-panel {
    display: flex;
    gap: 1rem;
    width: 100%;
  }
}
</style>
