<template>
  <div class="flex gap-0.5 col-start-2 flex-1 justify-center">
    <AppButton
      v-tooltip="'Rodada anterior'"
      class="btn-square btn-sm btn-ghost"
      aria-label="Show previous matchweek"
      :icon-left="IconChevronLeft"
      :disabled="currentMatchweek <= 1"
      @click="currentMatchweek -= 1"
    />
    <BaseSelect
      v-model="currentMatchweek"
      class="select-ghost w-7 p-0 justify-center h-2 bg-[url()] font-semibold text-lg [&_option]:font-normal [&_option]:textarea-md"
      :options="matchweeksOptions"
    />
    <AppButton
      v-tooltip="'Próxima rodada'"
      class="btn-square btn-sm btn-ghost"
      aria-label="Show next matchweek"
      :icon-left="IconChevronRight"
      :disabled="currentMatchweek >= matchweeks.length"
      @click="currentMatchweek += 1"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const props = defineProps<{
  matchweeks: Matchweek[];
}>();

const currentMatchweek = defineModel<number>('current-matchweek', { required: true });

const matchweeksOptions = computed<SelectOptionList<number>>(() => props.matchweeks.map(i => ({
  label: `Rodada ${i.week}`,
  value: i.week,
})));
</script>
