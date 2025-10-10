<template>
  <div class="flex gap-0.5 flex-wrap mt-1">
    <BaseSelect
      v-model="form.entryType"
      class="select-sm max-w-7"
      :options="TABLE_ENTRY_TYPE_OPTIONS"
    />
    <BaseSelect
      v-model="form.sortType"
      class="select-sm max-w-8"
      :options="TABLE_ENTRY_SORT_TYPE_OPTIONS"
    />
    <!-- <BaseSelect
      class="select-sm max-w-8"
      model-value=""
      :options="[{ label: 'Todas rodadas', value: '' }]"
    /> -->
    <BaseSelect
      v-if="showViewInput"
      v-model="form.view"
      class="select-sm max-w-8"
      :options="TABLE_ENTRY_VIEW_OPTIONS"
    />
    <AppButton
      class="btn-sm"
      label="Reiniciar"
      :icon-right="IconRestore"
      @click="$emit('reset')"
    />
  </div>
</template>

<script lang="ts">
export interface FiltersForm {
  entryType: TableEntryType;
  sortType: TableEntrySortType;
  view: TableEntryView;
}
</script>

<script setup lang="ts">
import { IconRestore } from '@tabler/icons-vue';

defineEmits<{ 'reset': [] }>();
defineProps<{
  showViewInput: boolean;
}>();

const form = defineModel<FiltersForm>({ required: true });
</script>

