<template>
  <div class="tournament">
    <PageHeader :breadcrumb-items="BREADCRUMB_ITEMS" />
    <div class="tournament__header">
      <TournamentProfileCard :tournament="tournament" />
      <AppButton
        v-tooltip="'Shift+S'"
        @click="saveTournamentChanges"
      >
        Salvar alterações
      </AppButton>
    </div>
    <TournamentPageStageControl
      v-if="showTournamentStageControl"
      v-model="form.selectedRoundId"
      class="tournament__stage-control"
      :stages="tournament.stages"
    />
    <template
      v-for="stage in form.tournament.stages"
      :key="stage.id"
    >
      <TournamentPageGroups
        v-if="stage.type === TournamentStageType.GROUPS && stage.id === selectedStageId"
        :stage="stage"
      />
      <TournamentPagePlayoffs
        v-else-if="stage.type === TournamentStageType.PLAYOFFS && stage.id === selectedStageId"
        :stage="stage"
        :is-last-stage="stage.id === tournament.stages[tournament.stages.length - 1].id"
        :selected-round-id="form.selectedRoundId"
      />
    </template>
    <AppModal
      title="Salvando alterações"
      format="dialog"
      :show-footer="false"
      :show-close-button="false"
      :show="isSaving"
    >
      Por favor, aguarde...
      <LoadingIndicator class="save-modal__loading-indicator" />
    </AppModal>
  </div>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import { TournamentStageType, type Tournament } from '@/types/Tournament';
import {
  computed, nextTick, provide, ref, type PropType,
} from 'vue';
import { useActiveElement, useMagicKeys, whenever } from '@vueuse/core';
import { useToast } from '@/composables/toast';
import { KEY_TOURNAMENT } from '@/constants/injectionKeys';
import { TournamentFormat } from '@/constants/tournament';
import api from '@/api';
import AppButton from './AppButton.vue';
import AppModal from './AppModal.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import PageHeader from './PageHeader.vue';
import TournamentProfileCard from './TournamentProfileCard.vue';
import TournamentPageGroups from './TournamentPageGroups.vue';
import TournamentPagePlayoffs from './TournamentPagePlayoffs.vue';
import TournamentPageStageControl from './TournamentPageStageControl.vue';

const toast = useToast();
const activeElement = useActiveElement();
const keys = useMagicKeys();

const props = defineProps({
  tournament: {
    type: Object as PropType<Tournament>,
    required: true,
  },
});

// Breadcrumb items
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  props.tournament?.name || '',
];

// Form
const form = ref({
  tournament: props.tournament,
  selectedRoundId: (
    (props.tournament.stages[0].type === TournamentStageType.PLAYOFFS)
      ? props.tournament.stages[0].rounds[0].id
      : props.tournament.stages[0].id
  ),
});

const selectedStageId = computed(() => (
  form.value.tournament.stages.find((stage) => (
    (stage.type === TournamentStageType.GROUPS)
      ? stage.id === form.value.selectedRoundId
      : stage.rounds.some((round) => round.id === form.value.selectedRoundId)
  ))?.id
));

const showTournamentStageControl = computed(() => {
  if (props.tournament.type === TournamentFormat.CUSTOM) {
    return (
      props.tournament.stages.length > 1
      || props.tournament.stages[0].type === TournamentStageType.PLAYOFFS
    );
  }
  return props.tournament.type === TournamentFormat.PLAYOFFS;
});

// Save changes
const isSaving = ref(false);

async function saveTournamentChanges() {
  if (isSaving.value) return;

  isSaving.value = true;

  try {
    await api.tournamentService.updateTournamentStages({
      id: props.tournament.id,
      stages: form.value.tournament.stages,
    });

    const { data } = await api.tournamentService.getTournamentStandings(props.tournament.id);

    data.forEach((item) => {
      const stage = props.tournament.stages.find(({ id }) => id === item.id);

      if (stage && stage.type === TournamentStageType.GROUPS) {
        stage.groups = item.groups;
      }
    });

    toast.success('Alterações salvas com sucesso!');
  } catch (error) {
    toast.error('Não foi possível salvar as alterações. Por favor, tente novamente.');
  } finally {
    isSaving.value = false;
  }
}

// Keyboard shortcuts
whenever(keys.shift_S, async () => {
  if (isSaving.value) return;

  if (activeElement.value?.tagName !== 'INPUT') {
    saveTournamentChanges();
    return;
  }

  const element = activeElement.value;

  activeElement.value.blur();

  await nextTick();
  await saveTournamentChanges();

  element.focus();
});

// Provided values
provide(KEY_TOURNAMENT, props.tournament);
</script>

<style lang="scss" scoped>
.tournament {
  &__header {
    display: grid;
    gap: 2rem;
    place-items: start flex-end;
    @include for-desktop-up {
      grid-template-columns: 2fr 1fr;
    }
    @include for-large-desktop-up {
      grid-template-columns: 1fr 1fr;
    }
  }
  &__stage-control {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }
}
.save-modal {
  &__loading-indicator {
    margin-top: 2rem;
  }
}
</style>
