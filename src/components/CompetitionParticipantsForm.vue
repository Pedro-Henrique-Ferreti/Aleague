<template>
  <ConfirmationModal
    :show="showConfirmationModal"
    :league-name="competitionName"
    :participants="participantsNotCreated"
    @close="toggleConfirmationModal"
    @confirm="saveParticipants"
  />
  <SuccessModal
    :show="showSuccessModal"
    :competition-id="competitionId"
    :competition-format="competitionFormat"
  />
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Escolha as equipes que participarão do campeonato. Você pode revisar as configurações antes de finalizar.</p>
  </PageHeader>
  <CompetitionFormStepper :current-step="3" />
  <CompetitionForm @submit="toggleConfirmationModal">
    <AppTransition name="fade">
      <LoadingIndicator v-if="isLoadingCompetition" />
      <div v-else>
        <CompetitionFormHeader
          :competition-name="competitionName"
          :competition-icon="format?.image"
          :competition-format-name="format?.name"
          :teams-count="numberOfTeams"
        />
        <AddParticipantsField
          class="participants-search-field"
          placeholder="Digite o nome da equipe"
          :participants="participants"
          :disabled="participants.length >= numberOfTeams"
          @add-team="addTeamToParticipantsList"
        />
        <div class="participants-grid">
          <ParticipantCard
            v-for="n in numberOfTeams"
            :key="n"
            :index="n"
            :name="participants[n - 1]?.name || ''"
            @remove="removeTeamFromParticipantsList(participants[n - 1]?.id || '')"
          />
        </div>
      </div>
    </AppTransition>
    <template #footer>
      <AppButton
        color="gray"
        :to="backButtonRoute"
      >
        Voltar
      </AppButton>
      <AppButton
        :is-loading="isSavingCompetition"
        :disabled="isLoadingCompetition || participants.length !== numberOfTeams"
      >
        Finalizar
      </AppButton>
    </template>
  </CompetitionForm>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';
import type { CompetitionFormat } from '@/types/Competition';
import type { LeagueParticipant } from '@/types/League';
import { computed, ref, onMounted, type PropType } from 'vue';
import { useTeamsStore } from '@/stores/teamsStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { competitionFormats } from '@/constants/competitions';

import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import PageHeader from './PageHeader.vue';
import AddParticipantsField from './AddParticipantsField.vue';
import CompetitionFormStepper from './CompetitionFormStepper.vue';
import CompetitionForm from './CompetitionForm.vue';
import CompetitionFormHeader from './CompetitionFormHeader.vue';
import ParticipantCard from './CompetititonFormParticipantCard.vue';
import SuccessModal from './CompetitionFormSuccessModal.vue';
import ConfirmationModal from './CompetitionConfirmationModal.vue';
import { storeToRefs } from 'pinia';

const teamsStore = useTeamsStore();
const { teams } = storeToRefs(teamsStore);
const { openSnackbarNotification } = useNotificationStore();

const props = defineProps({
  isLoadingCompetition: {
    type: Boolean,
    default: false,
  },
  competitionFormat: {
    type: String as PropType<CompetitionFormat>,
    required: true,
  },
  competitionName: {
    type: String,
    required: true,
  },
  competitionId: {
    type: String,
    required: true,
  },
  numberOfTeams: {
    type: Number,
    required: true,
  },
  backButtonRoute: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    required: true,
  },
  saveParticipantsFn: {
    type: Function as PropType<(participantsIds: string[]) => Promise<void>>,
    required: true,
  },
});

// Format info
const format = computed(() => Object.values(competitionFormats).find(
  ({ value }) => value === props.competitionFormat,
));

// Get teams list
const isLoadingTeamsList = ref(false);

onMounted(async () => {
  isLoadingTeamsList.value = true;

  try {
    await teamsStore.getTeams();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingTeamsList.value = false;
  }
});

const isLoadingCompetition = computed(() => props.isLoadingCompetition || isLoadingTeamsList.value);

// Participants
const participants = ref<LeagueParticipant[]>([]);

const participantsNotCreated = computed(() => {
  return participants.value.filter(({ created }) => !created);
});

function addTeamToParticipantsList(team: LeagueParticipant) {
  participants.value.push(team);
}

function removeTeamFromParticipantsList(id: string) {
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

// Save participants
const isSavingCompetition = ref(false);

async function saveParticipants() {
  toggleConfirmationModal();

  isSavingCompetition.value = true;

  try {
    await createNotCreatedTeams();

    const teamIds: string[] = [];

    participants.value.forEach((participant) => {
      const id = (participant.created)
        ? participant.id
        : teams.value.find(({ name }) => name === participant.name)?.id;

      if (id) {
        teamIds.push(id);
      }
    });

    await props.saveParticipantsFn(teamIds);

    toggleSuccessModal();
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isSavingCompetition.value = false;
  }
}

async function createNotCreatedTeams() {
  const teamsNotCreated = participants.value.filter(({ created }) => !created);

  if (teamsNotCreated.length > 0) {
    await teamsStore.createManyTeams(teamsNotCreated.map(({ name }) => ({ name })));
    await teamsStore.getTeams();
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
