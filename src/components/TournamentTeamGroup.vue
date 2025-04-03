<template>
  <div class="group">
    <AppChip
      class="group__chip"
      color="blue"
      :text="name"
    />
    <template
      v-for="(slot, index) in teams"
      :key="index"
    >
      <div
        v-if="!!slot"
        class="group__team"
      >
        <img
          class="group__team-emblem"
          :src="slot.emblem.url"
          :alt="`${slot.name}'s emblem'`"
        />
        <span>{{ slot.name }}</span>
        <AppRemoveButton
          v-if="!disabled"
          aria-label="Remover equipe"
          @click="teams[index] = null"
        />
      </div>
      <EmptySlotButton
        v-else
        :is-active="groupIsSelected && selectedTeamSlot === index"
        @click="$emit('empty-slot-click', selectedTeamSlot === index ? null : index)"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TeamSlot } from '@/views/EditTournamentTeamsView.vue';
import AppChip from './AppChip.vue';
import AppRemoveButton from './AppRemoveButton.vue';
import EmptySlotButton from './EmptySlotButton.vue';

defineEmits(['empty-slot-click']);
defineProps({
  name: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  selectedTeamSlot: {
    type: Number as PropType<number | null>,
    default: null,
  },
  groupIsSelected: {
    type: Boolean,
    default: false,
  },
});
const teams = defineModel('teams', {
  type: Array as PropType<TeamSlot[]>,
  required: true,
});
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
}
</style>
