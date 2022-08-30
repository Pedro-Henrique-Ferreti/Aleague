<template>
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

const teamsStore = useTeamsStore();
const { openSnackbarNotification } = useNotificationStore();
const { teams } = storeToRefs(teamsStore);

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
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
  @include for-desktop-up {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
