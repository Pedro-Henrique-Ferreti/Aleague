<template>
  <AppModal
    render-footer
    title="Configurações"
    size="large"
    :show="userSettingsStore.showModal"
    :is-loading="isLoading"
    :disable-save-button="disableSaveButton"
    @close="handleCloseModal"
    @cancel-action="handleCloseModal"
    @save-action="handleSave"
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
import AppModal from './AppModal.vue';
import UserSettingsTabButton from './UserSettingsTabButton.vue';
import UserSettingsProfile from './UserSettingsProfile.vue';
import UserSettingsChangePassword from './UserSettingsChangePassword.vue';

const userSettingsStore = useUserSettingsStore();
const { profileHasUnsavedChanges } = storeToRefs(userSettingsStore);
const { resetProfileInfo, saveProfileInfo } = userSettingsStore;

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

watch(() => activeTabId.value, (_, previousActiveTabId) => {
  if (previousActiveTabId === userSettingsTabs.profile.id) {
    resetProfileInfo();
  }
});

function handleCloseModal() {
  userSettingsStore.showModal = false;
  resetProfileInfo();
}

const disableSaveButton = computed<boolean>(() => {
  return !profileHasUnsavedChanges.value;
});

// Save data
const isLoading = ref(false);

async function handleSave() {
  if (profileHasUnsavedChanges.value) {
    isLoading.value = true;
    try {
      await saveProfileInfo();
      console.log('Saved successfully');
    } catch (error: Error) {
      console.log(error.message);
    } finally {
      isLoading.value = false;
    }
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
