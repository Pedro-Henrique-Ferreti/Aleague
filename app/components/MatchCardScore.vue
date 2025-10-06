<template>
  <div
    class="flex bg-gray-100 rounded-sm font-semibold before:content-['-']"
    :class="{
      'flex-col before:hidden': layout === 'vertical',
      'items-center before:order-1': layout !== 'vertical'
    }"
  >
    <BaseInput
      v-model.number="homeScore"
      class="text-[1rem] w-2 min-h-1.75 text-center focus:placeholder:text-transparent"
      :placeholder="layout === 'vertical' ? '-' : ''"
      :disabled="disabled"
      :mask="Number"
      :mask-options="MASK_OPTIONS"
    />
    <BaseInput
      v-model.number="awayScore"
      class="text-[1rem] w-2 min-h-1.75 text-center order-2 focus:placeholder:text-transparent"
      :placeholder="layout === 'vertical' ? '-' : ''"
      :disabled="disabled"
      :mask="Number"
      :mask-options="MASK_OPTIONS"
    />
  </div>
</template>

<script lang="ts" setup>
const MASK_OPTIONS = { min: 0, max: 99, scale: 0 } as const;

defineProps<{
  layout?: 'vertical';
  disabled?: boolean;
}>();

const homeScore = defineModel<Match['homeTeam']['score']>('home-score');
const awayScore = defineModel<Match['awayTeam']['score']>('away-score');
</script>
