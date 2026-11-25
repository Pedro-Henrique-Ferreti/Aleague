<template>
  <div class="flex gap-0.75 mb-1.5">
    <BaseSelect
      v-model="stageStore.selectedPlayoffRoundId"
      class="select-sm w-fit min-w-11"
      :options="roundOptions"
    />
    <AppButton
      v-tooltip="'Rodada anterior'"
      class="btn-square btn-sm btn-soft"
      aria-label="Mostrar rodada anterior"
      :icon-left="IconChevronLeft"
      :disabled="stageStore.selectedPlayoffRoundId === roundOptions[0]?.value"
      @click="setRound(selectedOptionIndex - 1)"
    />
    <AppButton
      v-tooltip="'Próxima rodada'"
      class="btn-square btn-sm btn-soft"
      aria-label="Mostrar próxima rodada"
      :icon-left="IconChevronRight"
      :disabled="stageStore.selectedPlayoffRoundId === roundOptions.at(-1)?.value"
      @click="setRound(selectedOptionIndex + 1)"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const stageStore = useStageStore();

const roundOptions = computed(() => stageStore.activePlayoffStage?.rounds.map((round): SelectOption<PlayoffRound['id']> => ({
  label: round.name,
  value: round.id,
})) ?? []);

const selectedOptionIndex = computed(() => {
  return roundOptions.value.findIndex(option => option.value === stageStore.selectedPlayoffRoundId);
});

function setRound(index: number) {
  stageStore.selectedPlayoffRoundId = roundOptions.value[index]?.value;
}
</script>
