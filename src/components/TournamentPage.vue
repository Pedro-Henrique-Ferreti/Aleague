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
      v-if="tournament.type !== TournamentFormat.ALL_PLAY_ALL"
      v-model="form.selectedRoundId"
      class="tournament__stage-control"
      :stages="tournament.stages"
    />
    <TournamentPageGroups
      v-if="form.tournament.stages[0].type === TournamentStageType.GROUPS"
      v-model:stage="form.tournament.stages[0]"
    />
    <TournamentPagePlayoffs
      v-else
      v-model:stage="form.tournament.stages[0]"
      is-last-stage
      :selected-round-id="form.selectedRoundId"
    />
    <AppModal
      id="save-changes-modal"
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
  nextTick, onMounted, ref, type PropType,
} from 'vue';
import { useActiveElement, useMagicKeys, whenever } from '@vueuse/core';
import { useToast } from '@/composables/toast';
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
  selectedRoundId: '',
});

onMounted(() => {
  if (props.tournament.stages[0].type === TournamentStageType.PLAYOFFS) {
    form.value.selectedRoundId = props.tournament.stages[0].rounds[0].id;
  }
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
