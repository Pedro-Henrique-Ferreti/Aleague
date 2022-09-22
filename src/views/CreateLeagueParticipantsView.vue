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
        <AddParticipantsField
          v-model="teamName"
          class="participants-search-field"
          placeholder="Digite o nome da equipe"
          :autocomplete-options="autocompleteOptions"
          @add-team="addTeamToParticipantsList"
        />
        <div class="participants-grid">
          <ParticipantCard
            v-for="n in league.numberOfTeams"
            :key="n"
            :index="n"
            :name="participants[n - 1] || ''"
            @remove="removeTeamFromParticipantList(participants[n - 1] || '')"
          />
        </div>
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
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamsStore } from '@/stores/teamsStore';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import AddParticipantsField from '@/components/AddParticipantsField.vue';
import CreateLeagueStepper from '@/components/CreateLeagueStepper.vue';
import CreateLeagueForm from '@/components/CreateLeagueForm.vue';
import CreateLeagueFormHeader from '@/components/CreateLeagueFormHeader.vue';
import ParticipantCard from '@/components/CreateLeagueParticipantCard.vue';

const route = useRoute();
const teamsStore = useTeamsStore();
const leaguesStore = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

// League data
const league = ref({
  id: route.params.id as string,
  name: '',
  numberOfTeams: 0,
});
const isLoadingLeague = ref(true);

// OnMounted hook
onMounted(async () => {
  isLoadingLeague.value = true;

  try {
    const [{ name, numberOfTeams }] = await Promise.all([
      leaguesStore.getLeague(league.value.id),
      teamsStore.getTeams(),
    ]);

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
});

// Search field
const teamName = ref('');
const autocompleteOptions = computed(() => {
  return teamsStore.teams
    .map(({ name }) => name )
    .filter((team) => !participants.value.includes(team));
});

// Participants
const participants = ref<(string | null)[]>([]);

function addTeamToParticipantsList() {
  participants.value.push(teamName.value);

  teamName.value = '';
}

function removeTeamFromParticipantList(teamName: string) {
  const teamIndex = participants.value.indexOf(teamName);

  if (teamIndex > -1) {
    participants.value.splice(teamIndex, 1);
  }
}
</script>

<style lang="scss" scoped>
.participants-search-field {
  margin-top: 2rem;
  @include for-large-tablet-landscape-up {
    width: 50%;
    margin: 0 auto;
    margin-top: 3.5rem;
  }
}
.participants-grid {
  --columns: 1;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid $color--light-gray-1;
  @include for-tablet-portrait-up {
    --columns: 2;
    gap: 1.5rem 1rem;
  }
  @include for-large-tablet-landscape-up {
    --columns: 3;
  }
  @include for-desktop-up {
    --columns: 4;
  }
}
</style>
