<template>
  <div class="group">
    <AppChip
      class="group__chip"
      color="blue"
      :text="name"
    />
    <template
      v-for="(participant, index) in teams"
      :key="index"
    >
      <div
        v-if="!!participant"
        class="group__team"
      >
        <img
          class="group__team-emblem"
          :src="participant.emblem.url"
          :alt="`${participant.name}'s emblem'`"
        />
        <span>{{ participant.name }}</span>
        <AppRemoveButton
          aria-label="Remover equipe"
          @click="teams[index] = null"
        />
      </div>
      <EmptySlotButton v-else />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { ParticipantSlot } from '@/types/TournamentParticipant';
import type { PropType } from 'vue';
import AppChip from './AppChip.vue';
import AppRemoveButton from './AppRemoveButton.vue';
import EmptySlotButton from './EmptySlotButton.vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
});
const teams = defineModel('teams', {
  type: Array as PropType<ParticipantSlot[]>,
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
