<template>
  <AppTooltip label="Preencher aleatoriamente">
    <AppButton
      class="btn-square btn-accent btn-soft"
      aria-label="Preencher aleatoriamente"
      :icon-left="IconWand"
      @click="fillSlots"
    />
  </AppTooltip>
</template>

<script lang="ts" setup>
import { IconWand } from '@tabler/icons-vue';

const props = defineProps<{
  teamOptions?: TeamDetails[];
}>();

const groups = defineModel<StageSeedingForm['groups']>({ required: true });

function fillSlots() {
  const options = Object.assign([], props.teamOptions ?? []) as TeamDetails[];

  for (const group of groups.value) {
    group.teams.forEach((slot, index) => {
      if (slot !== null || options.length === 0) return;

      group.teams[index] = getRandomItem(options)?.id ?? null;
    });
  }
}
</script>
