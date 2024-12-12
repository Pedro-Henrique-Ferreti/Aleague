<template>
  <div class="group">
    <AppChip
      class="group__chip"
      color="blue"
      :text="name"
    />
    <template v-for="slot in numberOfSlots">
      <div
        v-if="teams[slot - 1]"
        class="group__team"
        :key="teams[slot - 1].id"
      >
        <img
          class="group__team-emblem"
          :src="teams[slot - 1].emblem.url"
          :alt="`${teams[slot - 1].name}'s emblem'`"
        />
        <span>{{ teams[slot - 1].name }}</span>
        <AppRemoveButton
          aria-label="Remover equipe"
          @click="() => delete teamsValue[slot - 1]"
        />
      </div>
      <SelectTeamMenu
        v-else
        title="Adicionar equipe"
        confirm-button-text="Adicionar"
        :team-options="selectTeamMenuOptions"
        :key="slot"
        @select-team="teamsValue[slot - 1] = $event"
      >
        <button
          class="group__empty-slot-button"
          type="button"
        >
          <IconPlus />
          <span>Adicionar</span>
        </button>
      </SelectTeamMenu>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { TeamPreview } from '@/types/Team';
import type { FormStage } from '@/components/TournamentParticipants.vue';
import { computed, type PropType } from 'vue';
import IconPlus from '@/assets/icons/Plus.svg';
import AppChip from './AppChip.vue';
import AppRemoveButton from './AppRemoveButton.vue';
import SelectTeamMenu from './SelectTeamMenu.vue';

const emit = defineEmits(['update:teams']);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  teams: {
    type: Array as PropType<TeamPreview[]>,
    required: true,
  },
  teamOptions: {
    type: Array as PropType<TeamPreview[]>,
    required: true,
  },
  numberOfSlots: {
    type: Number,
    required: true,
  },
  numberOfGroups: {
    type: Number,
    required: true,
  },
  stages: {
    type: Array as PropType<FormStage[]>,
    required: true,
  },
  showTeamOptionLabel: {
    type: Boolean,
    default: true,
  },
});

const teamsValue = computed({
  get: () => props.teams,
  set: (value) => emit('update:teams', value),
});

const selectTeamMenuOptions = computed(() => props.teamOptions.map((team) => {
  const participantGroup = props.stages.flatMap(
    (stage) => stage.participantsGroups,
  ).find((group) => group.teams.find((item) => item?.id === team.id));

  return {
    ...team,
    disabled: !!participantGroup,
    labelText: (props.showTeamOptionLabel) ? participantGroup?.name : undefined,
  };
}));
</script>

<style lang="scss" scoped>
.group {
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem 0.625rem;
  padding-top: 1.25rem;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--large;
  position: relative;
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(auto-fit, minmax(18.5rem, 1fr));
  }
  &__chip {
    position: absolute;
    top: -0.875rem;
    left: 50%;
    transform: translateX(-50%);
  }
  &__team {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.5rem;
    height: 2.375rem;
    padding: 0 0.625rem;
    color: $color--text-strong;
  }
  &__team-emblem {
    max-width: 1.5rem;
    max-height: 1.5rem;
  }
  &__empty-slot-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    height: 2.375rem;
    background-color: $color--neutral-100;
    border: 1px dashed $color--neutral-300;
    border-radius: $radius--medium;
    font-size: 0.875rem;
    transition: border-color $transition--fastest;
    &:hover {
      border-color: $color--text-400;
    }
    svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
}
</style>
