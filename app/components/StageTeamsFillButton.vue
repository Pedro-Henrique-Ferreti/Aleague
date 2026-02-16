<template>
  <AppTooltip label="Preencher participantes">
    <AppButton
      class="btn-square btn-accent btn-soft"
      aria-label="Fill slots"
      :icon-left="IconWand"
      @click="fillSlots"
    />
  </AppTooltip>
</template>

<script lang="ts" setup>
import type { StageTeamsForm } from './StageTeamsModal.vue';
import { IconWand } from '@tabler/icons-vue';

const props = defineProps<{
  teamOptions?: TeamDetails[];
}>();

const groups = defineModel<StageTeamsForm['groups']>({ required: true });

function fillSlots() {
  const options = Object.assign([], props.teamOptions ?? []) as TeamDetails[];

  groups.value.forEach((group, index) => {
    group.teams.forEach((slot, slotIndex) => {
      if (slot !== null || options.length === 0) return;

      const [team] = options.splice(Math.floor(Math.random() * options.length), 1);

      groups.value[index]!.teams[slotIndex] = team?.id || null;
    });
  });
}
</script>
