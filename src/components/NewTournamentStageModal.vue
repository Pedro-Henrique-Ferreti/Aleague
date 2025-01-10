<template>
  <AppModal
    format="drawer"
    title="Nova fase"
    confirm-button-text="Salvar alterações"
    :show="show"
    :confirm-button-is-disabled="!form.name"
    @confirm="addStage"
    @close="$emit('close')"
  >
    <template #header-icon>
      <div class="stage-modal__icon">
        <IconPencil />
      </div>
    </template>
    <span class="stage-modal__format-label">
      Formato
    </span>
    <div class="stage-modal__format">
      <AppRadioInput
        v-model="form.type"
        text="Fase de grupos"
        :value="TournamentStageType.GROUPS"
      />
      <AppRadioInput
        v-model="form.type"
        text="Eliminatórias"
        :value="TournamentStageType.PLAYOFFS"
      />
    </div>
    <div class="stage-modal__fields">
      <AppInput
        v-model.trim="form.name"
        id="new-tournament--name"
        label="Nome"
      />
      <AppDropdown
        v-if="form.type === TournamentStageType.GROUPS"
        v-model="form.confrontationType"
        id="new-tournament--confrontation-type"
        label="Disputa de partidas"
        :options="TOURNAMENT_STAGE_CONFRONTATION_OPTIONS"
      />
    </div>
    <div class="stage-modal__toggles">
      <AppToggle
        v-model="form.doubleLegged"
        text="Partidas de ida e volta"
      />
      <AppToggle
        v-if="form.type === TournamentStageType.PLAYOFFS"
        v-model="form.lastRoundIsDoubleLegged"
        text="Última rodada com partidas de ida e volta"
      />
    </div>
    <span class="stage-modal__participants-title">
      Participantes
    </span>
    <template v-if="form.type === TournamentStageType.GROUPS">
      <p>
        Você deve escolher a quantidade de grupos e o número de equipes em cada grupo.
        Com base nisso, o sistema irá exibir o total de equipes participantes.
      </p>
      <div class="stage-modal__counters">
        <AppCounter
          v-model="form.numberOfGroups"
          label="Quantidade de grupos"
          :min="1"
        />
        <AppCounter
          v-model="form.numberOfTeamsPerGroup"
          label="Equipes em cada grupo"
          :step="2"
          :min="2"
        />
        <AppCounter
          readonly
          label="Total de equipes"
          :model-value="numberOfGroupStageTeams"
        />
      </div>
    </template>
    <template v-else>
      <p>
        Você deve escolher a quantidade de equipes que participam desta fase.
        Com base nisso, o sistema irá exibir o número de rodadas.
      </p>
      <div class="stage-modal__counters">
        <AppCounter
          v-model="form.numberOfTeams"
          label="Equipes participantes"
          :step="2"
          :min="2"
        />
        <AppCounter
          readonly
          label="Número de rodadas"
          :model-value="numberOfPlayoffRounds"
        />
      </div>
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import type { TournamentFormStage } from '@/types/NewTournamentForm';
import { TournamentStageType, type TypeStageConfrontation } from '@/types/Tournament';
import { computed, ref } from 'vue';
import {
  TOURNAMENT_STAGE_CONFRONTATION_OPTIONS,
  TournamentStageConfrontation,
} from '@/constants/tournament';
import IconPencil from '@/assets/icons/Pencil.svg';
import AppModal from './AppModal.vue';
import AppRadioInput from './AppRadioInput.vue';
import AppInput from './AppInput.vue';
import AppDropdown from './AppDropdown.vue';
import AppToggle from './AppToggle.vue';
import AppCounter from './AppCounter.vue';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'add-stage', value: TournamentFormStage): void;
}>();
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const form = ref({
  type: TournamentStageType.GROUPS,
  name: '',
  confrontationType: TournamentStageConfrontation.SAME_GROUP as TypeStageConfrontation,
  doubleLegged: false,
  lastRoundIsDoubleLegged: false,
  numberOfGroups: 1,
  numberOfTeamsPerGroup: 2,
  numberOfTeams: 2,
});

const numberOfPlayoffRounds = computed(() => {
  let teams = form.value.numberOfTeams;
  let count = 0;

  while (teams % 2 === 0) {
    teams /= 2;
    count += 1;
  }

  return count;
});

const numberOfGroupStageTeams = computed(() => (
  form.value.numberOfGroups * form.value.numberOfTeamsPerGroup
));

// Add stage
function addStage() {
  if (form.value.type === TournamentStageType.GROUPS) {
    emit('add-stage', {
      id: new Date().getTime(),
      name: form.value.name,
      numberOfTeams: numberOfGroupStageTeams.value,
      type: TournamentStageType.GROUPS,
      confrontationType: form.value.confrontationType,
      numberOfGroups: form.value.numberOfGroups,
      numberOfLegs: (form.value.doubleLegged) ? 2 : 1,
    });
  } else {
    emit('add-stage', {
      id: new Date().getTime(),
      name: form.value.name,
      numberOfTeams: form.value.numberOfTeams,
      type: TournamentStageType.PLAYOFFS,
      numberOfRounds: numberOfPlayoffRounds.value,
      isDoubleLegged: form.value.doubleLegged,
      finalRoundIsDoubleLegged: form.value.lastRoundIsDoubleLegged,
    });
  }

  emit('close');
}
</script>

<style lang="scss" scoped>
.stage-modal {
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    background-color: $color--neutral-100;
    border-radius: $radius--full;
    color: $color--primary-800;
    &:deep(svg) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  &__format {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
  }
  &__format-label {
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__fields {
    display: grid;
    gap: 1rem;
  }
  &__toggles {
    display: grid;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  &__participants-title {
    display: block;
    color: $color--text-strong;
    font-weight: $font-weight--medium;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  &__counters {
    display: grid;
    place-items: center;
    gap: 2rem 1rem;
    margin-top: 2rem;
    @media (min-width: 475px){
      grid-template-columns: repeat(2, 1fr);
      >:nth-child(3) {
        grid-column: 1/3;
      }
    }
  }
}
</style>
