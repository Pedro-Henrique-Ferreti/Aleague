<template>
  <div class="flex gap-0.5 flex-wrap mt-1">
    <BaseSelect
      v-model="form.type"
      class="select-sm max-w-7"
      :options="STANDINGS_TYPE_OPTIONS"
    />
    <BaseSelect
      v-model="form.ordering"
      class="select-sm max-w-8"
      :options="STANDINGS_ORDERING_OPTIONS"
    />
    <!-- <BaseSelect
      class="select-sm max-w-8"
      model-value=""
      :options="[{ label: 'Todas rodadas', value: '' }]"
    />
    <BaseSelect
      class="select-sm max-w-8"
      model-value=""
      :options="[{ label: 'Por grupo', value: '' }, { label: 'Geral', value: '' }]"
    /> -->
    <AppButton
      class="btn-sm"
      label="Reiniciar"
      :icon-right="IconRestore"
      @click="$emit('reset')"
    />
  </div>
</template>

<script setup lang="ts">
import { IconRestore } from '@tabler/icons-vue';

defineEmits<{ 'reset': [] }>();

const form = defineModel<StandingsFilters>({ required: true });
</script>

