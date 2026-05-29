<template>
  <div class="flex gap-0.5 col-start-2 flex-1 justify-center">
    <AppButton
      v-tooltip="'Rodada anterior'"
      class="btn-square btn-sm btn-ghost"
      aria-label="Mostrar rodada anterior"
      :icon-left="IconChevronLeft"
      :disabled="matchweekCardStore.isSimulatingResults || matchweekCardStore.selectedWeekNumber <= 1"
      @click="matchweekCardStore.selectedWeekNumber -= 1"
    />
    <BaseSelect
      v-model="matchweekCardStore.selectedWeekNumber"
      class="select-ghost w-7 p-0 justify-center h-2 bg-white bg-[url()] font-semibold text-lg [&_option]:font-normal [&_option]:textarea-md"
      :options="weekOptions"
      :disabled="matchweekCardStore.isSimulatingResults"
    />
    <AppButton
      v-tooltip="'Próxima rodada'"
      class="btn-square btn-sm btn-ghost"
      aria-label="Mostrar próxima rodada"
      :icon-left="IconChevronRight"
      :disabled="matchweekCardStore.isSimulatingResults || matchweekCardStore.selectedWeekNumber >= matchweeks.length"
      @click="matchweekCardStore.selectedWeekNumber += 1"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const stageStore = useStageStore();
const matchweekCardStore = useMatchweekCardStore();

const matchweeks = computed(() => stageStore.activeGroupStage?.matchweeks ?? []);

const weekOptions = computed<SelectOptionList<Matchweek['week']>>(() => matchweeks.value.map(i => ({
  label: `Rodada ${i.week}`,
  value: i.week,
})));
</script>
