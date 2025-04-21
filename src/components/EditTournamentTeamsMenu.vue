<template>
  <AppPopupMenu
    confirm-button-text="Preencher"
    title="Preencher equipes"
    :auto-hide="false"
    :confirm-button-is-disabled="!form.tournamentId || !form.stageId"
    @confirm="submitForm"
  >
    <slot />
    <template #content>
      <div class="form">
        <AppDropdown
          v-model="form.groupId"
          label="Grupo"
          :options="groupOptions"
          :disabled="isLoadingTournament"
        />
        <AppDropdown
          v-model="form.tournamentId"
          label="Campeonato"
          :options="tournamentOptions"
          :disabled="isLoadingTournament"
        />
        <AppDropdown
          v-model="form.stageId"
          label="Fase"
          :options="stageOptions"
          :disabled="isLoadingTournament || stageOptions.length === 0"
        />
      </div>
    </template>
  </AppPopupMenu>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '@/types/Dropdown';
import { TournamentStageType, type Tournament, type TournamentPreview } from '@/types/Tournament';
import type { MatchTeam } from '@/types/Match';
import {
  computed, ref, watch, watchEffect,
} from 'vue';
import { useToast } from '@/composables/toast';
import api from '@/api';
import AppPopupMenu from './AppPopupMenu.vue';
import AppDropdown from './AppDropdown.vue';

const toast = useToast();

const emit = defineEmits<{
  (e: 'select-teams', value: MatchTeam[]): void;
}>();
const form = ref({
  groupId: '',
  tournamentId: '',
  stageId: '',
});

const tournaments = ref<TournamentPreview[]>([]);
const tournament = ref<Tournament | null>(null);

watch(() => form.value.groupId, () => {
  form.value.tournamentId = '';
});

// Dropdown options
const groupOptions = computed<DropdownOption[]>(() => {
  const options: DropdownOption[] = [];

  tournaments.value.filter((i) => !!i.group).forEach(({ group }) => {
    const isInArray = options.find(({ id }) => id === group?.id);

    if (!isInArray) {
      options.push({
        id: group?.id || '',
        text: group?.name || '',
      });
    }
  });

  return options;
});

const tournamentOptions = computed<DropdownOption[]>(() => (
  tournaments.value.filter(
    (i) => ((!form.value.groupId) ? i.group === null : i.group?.id === form.value.groupId),
  ).map((i) => ({
    id: i.id,
    text: i.name,
  }))
));

const stageOptions = computed<DropdownOption[]>(() => (
  tournament.value?.stages.map((stage) => ({
    id: stage.id,
    text: stage.name || 'Primeira fase',
  })) || []
));

// Get tournaments
const isLoading = ref(true);

async function getTournamentOptions() {
  isLoading.value = true;

  try {
    const { data } = await api.tournamentService.getAllTournaments();
    tournaments.value = data;
  } catch (error: any) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
}

getTournamentOptions();

// Get tournament
const isLoadingTournament = ref(false);

watchEffect(async () => {
  if (!form.value.tournamentId) return;

  isLoadingTournament.value = true;

  try {
    const { data } = await api.tournamentService.getTournamentById(form.value.tournamentId);

    tournament.value = data;
  } catch (error: any) {
    toast.error(error);
  } finally {
    isLoadingTournament.value = false;
  }
});

// Submit form
function submitForm() {
  const stage = tournament.value?.stages.find((i) => i.id === form.value.stageId);

  if (!stage) return;

  if (stage.type === TournamentStageType.PLAYOFFS) {
    emit(
      'select-teams',
      stage.rounds[0].matchups.flatMap(
        (matchup) => ([matchup.firstTeam, matchup.secondTeam]),
      ).filter((team) => !!team && team.id !== null) as MatchTeam[],
    );
  } else {
    emit(
      'select-teams',
      stage.groups.flatMap(
        (group) => group.standings.map((standing) => standing.team),
      ).filter((team) => team.id !== null) as MatchTeam[],
    );
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  gap: 1rem;
}
</style>
