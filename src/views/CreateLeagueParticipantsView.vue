<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Escolha as equiper que participarão do campeonato. Você pode revisar as configurações antes de finalizar.</p>
  </PageHeader>
  <CreateLeagueStepper :current-step="3" />
  <CreateLeagueForm>
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingLeague" />
      <div v-else>
        <CreateLeagueFormHeader
          :league-name="league.name"
          :teams-count="league.numberOfTeams"
        />
      </div>
    </AppTransition>
    <template #footer>
      <AppButton
        color="gray"
        :to="{ name: 'create-league-rules', params: { id: league.id }}"
      >
        Voltar
      </AppButton>
      <AppButton>Finalizar</AppButton>
    </template>
  </CreateLeagueForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import CreateLeagueStepper from '@/components/CreateLeagueStepper.vue';
import CreateLeagueForm from '@/components/CreateLeagueForm.vue';
import CreateLeagueFormHeader from '@/components/CreateLeagueFormHeader.vue';

const route = useRoute();
const leaguesStore = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

// League data
const league = ref({
  id: route.params.id as string,
  name: '',
  numberOfTeams: 0,
});
const isLoadingLeague = ref(true);

getLeague();

async function getLeague() {
  isLoadingLeague.value = true;

  try {
    const { name, numberOfTeams } = await leaguesStore.getLeague(league.value.id);

    league.value.name = name;
    league.value.numberOfTeams = numberOfTeams || 0;
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
