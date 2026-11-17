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
  teamOptions: TeamDetails[];
}>();

const groups = defineModel<StageSeedingForm['groups']>({ required: true });

function fillSlots() {
  for (const group of groups.value) {
    group.teams.forEach((slot, index) => {
      setTimeout(() => {
        if (slot === null) {
          group.teams[index] = getRandomItem(props.teamOptions)?.id ?? null;
        }
      });
    });
  }
}
</script>
