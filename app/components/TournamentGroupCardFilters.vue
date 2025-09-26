<template>
  <div class="flex gap-0.5 flex-wrap mt-1">
    <BaseSelect
      class="select-sm max-w-7"
      model-value=""
      :options="STANDINGS_TYPE_OPTIONS"
    />
    <BaseSelect
      class="select-sm max-w-8"
      model-value=""
      :options="STANDINGS_SORTING_OPTIONS"
    />
    <BaseSelect
      class="select-sm max-w-8"
      model-value=""
      :options="[{ label: 'Todas rodadas', value: '' }]"
    />
    <AppButton
      class="btn-sm"
      label="Reiniciar"
      :icon-right="IconRestore"
    />
  </div>
</template>

<script setup lang="ts">
import { IconRestore } from '@tabler/icons-vue';
</script>

