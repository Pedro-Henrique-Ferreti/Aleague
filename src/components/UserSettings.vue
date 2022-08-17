<template>
  <AppModal
    render-footer
    title="Configurações"
    size="large"
    :show="userStore.showUserSettingsModal"
    @close="userStore.showUserSettingsModal = false"
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
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import AppModal from './AppModal.vue';
import UserSettingsTabButton from './UserSettingsTabButton.vue';
import UserSettingsProfile from './UserSettingsProfile.vue';
import UserSettingsChangePassword from './UserSettingsChangePassword.vue';

const userStore = useUserStore();

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
