<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Agora você deve escolher as regras para o seu campeonato <b>pontos corridos</b>.</p>
  </PageHeader>
  <CreateLeagueStepper :current-step="2" />
  <CreateLeagueLayout>
    <CreateLeagueForm>
      <AppTransition name="fade">
        <LoadingIndicator v-if="isLoadingLeague" />
      </AppTransition>
      <template #footer>
        <AppButton
          color="gray"
          :to="{ name: 'create-league-format', params: { id: $route.params.id }}"
        >
          Voltar
        </AppButton>
        <AppButton>Próximo passo</AppButton>
      </template>
    </CreateLeagueForm>
  </CreateLeagueLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';

import AppTransition from './AppTransition.vue';
import PageHeader from './PageHeader.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import CreateLeagueLayout from './CreateLeagueLayout.vue';
import CreateLeagueForm from './CreateLeagueForm.vue';
import CreateLeagueStepper from './CreateLeagueStepper.vue';

const route = useRoute();
const leaguesStore = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

const isLoadingLeague = ref(true);

// League data
const leagueName = ref('');

getLeague();

async function getLeague() {
  isLoadingLeague.value = true;

  try {
    const { name } = await leaguesStore.getLeague(route.params.id as string);

    leagueName.value = name;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeague.value = false;
  }
}
</script>
