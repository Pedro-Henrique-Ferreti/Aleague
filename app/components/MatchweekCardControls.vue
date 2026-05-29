<template>
  <div class="flex gap-0.5 col-start-2 flex-1 justify-center">
    <AppButton
      v-tooltip="'Rodada anterior'"
      class="btn-square btn-sm btn-ghost"
      aria-label="Mostrar rodada anterior"
      :icon-left="IconChevronLeft"
      :disabled="disabled || matchweekNumber <= 1"
      @click="matchweekNumber -= 1"
    />
    <BaseSelect
      v-model="matchweekNumber"
      class="select-ghost w-7 p-0 justify-center h-2 bg-[url()] font-semibold text-lg [&_option]:font-normal [&_option]:textarea-md"
      :options="matchweeksOptions"
      :disabled="disabled"
    />
    <AppButton
      v-tooltip="'Próxima rodada'"
      class="btn-square btn-sm btn-ghost"
      aria-label="Mostrar próxima rodada"
      :icon-left="IconChevronRight"
      :disabled="disabled || matchweekNumber >= matchweeks.length"
      @click="matchweekNumber += 1"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const props = defineProps<{
  matchweeks: Matchweek[];
  disabled?: boolean;
}>();

const matchweekNumber = defineModel<Matchweek['week']>('matchweek-number', { required: true });

const matchweeksOptions = computed<SelectOptionList<Matchweek['week']>>(() => props.matchweeks.map(i => ({
  label: `Rodada ${i.week}`,
  value: i.week,
})));
</script>
