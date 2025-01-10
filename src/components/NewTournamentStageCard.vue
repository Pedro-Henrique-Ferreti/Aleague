<template>
  <div class="stage-card | app-base-card">
    <div class="stage-card__image">
      <Component
        class="stage-card__icon"
        :is="stage.type === TournamentStageType.GROUPS ? IconGroupsStage : IconPlayoffStage"
      />
    </div>
    <div>
      <span class="stage-card__subtitle">
        Fase {{ order }}
      </span>
      <span class="stage-card__title">
        {{ stage.name }}
      </span>
    </div>
    <div class="stage-card__buttons">
      <AppIconButton
        v-tooltip="'Editar fase'"
        color="secondary"
        size="extra-small"
        aria-label="Editar fase"
        :icon="IconPencil"
        @click="$emit('edit')"
      />
      <AppIconButton
        v-tooltip="'Excluir fase'"
        color="danger"
        size="extra-small"
        aria-label="Excluir fase"
        :icon="IconDelete"
        @click="$emit('delete')"
      />
    </div>
    <div class="stage-card__chip-group | app-chip-group">
      <AppChip
        color="blue"
        :icon-left="IconShield"
        :text="`${stage.numberOfTeams} equipes`"
      />
      <AppChip
        v-if="stage.type === TournamentStageType.GROUPS"
        :icon-left="IconListOrdered"
        :text="(stage.numberOfGroups === 1) ? '1 grupo' : `${stage.numberOfGroups} grupos`"
      />
      <AppChip :icon-left="IconRepeat">
        {{ doubleLeggedText }}
      </AppChip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TournamentFormStage } from '@/types/NewTournamentForm';
import { computed, type PropType } from 'vue';
import { TournamentStageType } from '@/types/Tournament';
import IconPencil from '@/assets/icons/Pencil.svg';
import IconDelete from '@/assets/icons/Delete.svg';
import IconShield from '@/assets/icons/Shield.svg';
import IconListOrdered from '@/assets/icons/ListOrdered.svg';
import IconRepeat from '@/assets/icons/Repeat.svg';
import IconGroupsStage from '@/assets/icons/GroupsStage.svg';
import IconPlayoffStage from '@/assets/icons/PlayoffStage.svg';
import AppChip from './AppChip.vue';
import AppIconButton from './AppIconButton.vue';

defineEmits(['edit', 'delete']);
const props = defineProps({
  stage: {
    type: Object as PropType<TournamentFormStage>,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const doubleLeggedText = computed(() => (
  (props.stage.type === TournamentStageType.GROUPS && props.stage.numberOfLegs === 2)
  || (props.stage.type === TournamentStageType.PLAYOFFS && props.stage.isDoubleLegged)
    ? 'Ida e volta' : 'Apenas ida'
));
</script>

<style lang="scss" scoped>
.stage-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem 1rem;
  width: 100%;
  max-width: 25.5rem;
  padding: 0.75rem;
  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    background-color: $color--neutral-50;
    border-radius: $radius--medium;
  }
  &__icon {
    width: 3.5rem;
    height: 3.5rem;
  }
  &__title {
    color: $color--text-strong;
    font-size: 1.1875rem;
    font-weight: $font-weight--medium;
  }
  &__subtitle {
    display: block;
    margin-bottom: 0.125rem;
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  &__chip-group {
    grid-column: 1 / 4;
  }
}
</style>
