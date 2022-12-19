<template>
  <ConfirmationModal
    :show="showConfirmationModal"
    :league-name="league.name"
    :participants="participantsNotCreated"
    @close="toggleConfirmationModal"
    @confirm="saveLeague"
  />
  <SuccessModal
    :show="showSuccessModal"
    :league-id="league.id"
  />
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Escolha as equiper que participarão do campeonato. Você pode revisar as configurações antes de finalizar.</p>
  </PageHeader>
  <CompetitionStepper :current-step="3" />
  <CompetitionForm @submit="toggleConfirmationModal">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingLeague" />
      <div v-else>
        <CompetitionFormHeader
          :competition-name="league.name"
          :teams-count="league.numberOfTeams"
        />
        <AddParticipantsField
          class="participants-search-field"
          placeholder="Digite o nome da equipe"
          :participants="participants"
          :disable-add-team="participants.length >= league.numberOfTeams"
          @add-team="addTeamToParticipantsList"
        />
        <div class="participants-grid">
          <ParticipantCard
            v-for="n in league.numberOfTeams"
            :key="n"
            :index="n"
            :name="participants[n - 1]?.name || ''"
            @remove="removeTeamFromParticipantsList(participants[n - 1]?.id || -1)"
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
      <AppButton
        :is-loading="isSavingLeague"
        :disabled="participants.length !== league.numberOfTeams"
      >
        Finalizar
      </AppButton>
    </template>
  </CompetitionForm>
</template>

<script lang="ts" setup>
import type { LeagueParticipant } from '@/types/League';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamsStore } from '@/stores/teamsStore';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';

import AppTransition from '@/components/AppTransition.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import AddParticipantsField from '@/components/AddParticipantsField.vue';
import CompetitionStepper from '@/components/CompetitionStepper.vue';
import CompetitionForm from '@/components/CompetitionForm.vue';
import CompetitionFormHeader from '@/components/CompetitionFormHeader.vue';
import ParticipantCard from '@/components/CompetititonParticipantCard.vue';
import ConfirmationModal from '@/components/CompetitionConfirmationModal.vue';
import SuccessModal from '@/components/CompetitionSuccessModal.vue';

const route = useRoute();
const teamsStore = useTeamsStore();
const { getLeagueById, saveLeagueParticipants } = useLeaguesStore();
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
      getLeagueById(league.value.id),
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

// Participants
const participants = ref<LeagueParticipant[]>([]);

const participantsNotCreated = computed(() => {
  return participants.value.filter(({ created }) => !created);
});

function addTeamToParticipantsList(team: LeagueParticipant) {
  participants.value.push(team);
}

function removeTeamFromParticipantsList(id: number) {
  const teamIndex = participants.value.findIndex((item) => item.id === id);

  if (teamIndex > -1) {
    participants.value.splice(teamIndex, 1);
  }
}

// Confirmation modal
const showConfirmationModal = ref(false);

function toggleConfirmationModal() {
  showConfirmationModal.value = !showConfirmationModal.value;
}

// Success modal
const showSuccessModal = ref(false);

function toggleSuccessModal() {
  showSuccessModal.value = !showSuccessModal.value;
}

// Save league participants
const isSavingLeague = ref(false);

async function saveLeague() {
  toggleConfirmationModal();

  isSavingLeague.value = true;

  try {
    await saveLeagueParticipants(league.value.id, participants.value);

    toggleSuccessModal();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isSavingLeague.value = false;
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
