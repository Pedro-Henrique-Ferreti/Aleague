<template>
  <TabPanel
    :tabs="Object.values(filterTabs)"
    :active-tab-id="activeTabId"
    @set-active-tab="activeTabId = $event"
  >
    <template #controls>
      <AppButton
        color="outline"
        icon-left="package"
      >
        Pacotes
      </AppButton>
      <AppButton
        icon-left="plus"
        icon-rounded
      >
        Nova equipe
      </AppButton>
    </template>
  </TabPanel>
  <transition
    name="fade"
    mode="out-in"
  >
    <LoadingIndicator v-if="isLoading" />
    <NoContent
      v-else-if="teams.length < 1"
      title="Não há equipes cadastradas"
      action-button-text="Acessar pacotes de equipe"
    >
      <p>Você ainda não criou nenhuma equipe. Você pode fazer isso através dos pacotes de equipe.</p>
    </NoContent>
    <div
      v-else
      class="teams-card-grid"
    >
      <TeamsCard
        v-for="team in teams"
        :key="team.id"
        :name="team.name"
        :is-favorite="team.isFavorite"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTeamsStore } from '@/stores/teamsStore';
import { useNotificationStore } from '@/stores/notificationStore';
import TeamsCard from './TeamsCard.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import NoContent from './NoContent.vue';
import TabPanel from './TabPanel.vue';

const teamsStore = useTeamsStore();
const { openSnackbarNotification } = useNotificationStore();
const { teams } = storeToRefs(teamsStore);

const filterTabs = {
  all: {
    id: 1,
    name: 'Todos',
  },
  favorites: {
    id: 2,
    name: 'Favoritos',
  },
};

const activeTabId = ref(filterTabs.all.id);

const isLoading = ref(true);

async function getTeams() {
  isLoading.value = true;

  try {
    await teamsStore.getTeams();
  } catch (error) {
    openSnackbarNotification({
      type: 'error',
      message: 'Não foi possível carregar a lista de equipes.',
    });
  } finally {
    isLoading.value = false;
  }
}

onMounted(getTeams);
</script>

<style lang="scss" scoped>
.teams-card-grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
  @include for-desktop-up {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
