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
    <template v-if="matchweeks > 0">
      <BaseSelect
        v-model="form.weekDirection"
        class="select-sm max-w-8"
        :options="weekDirectionOptions"
      />
      <BaseSelect
        v-model="form.week"
        class="select-sm max-w-8"
        :options="weekOptions"
      />
    </template>
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
  week: Matchweek['week'];
  weekDirection: WeekDirection;
}

export const DEFAULT_WEEK_OPTION: Readonly<SelectOption<FiltersForm['week']>> = {
  label: 'Todos',
  value: -1,
}
</script>

<script setup lang="ts">
import { IconRestore } from '@tabler/icons-vue';

defineEmits<{ 'reset': [] }>();
const props = defineProps<{
  showViewInput: boolean;
  matchweeks: number;
}>();

const form = defineModel<FiltersForm>({ required: true });

const weekDirectionOptions: Readonly<SelectOptionList<FiltersForm['weekDirection']>> = [
  { label: 'Anterior a', value: WeekDirection.BEFORE },
  { label: 'Depois de', value: WeekDirection.AFTER },
];

const weekOptions = computed<SelectOptionList<FiltersForm['week']>>(() => [
  DEFAULT_WEEK_OPTION,
  ...Array.from({ length: props.matchweeks }, (_, i) => ({
    label: `Rodada ${i + 1}`,
    value: i + 1,
  })),
]);
</script>

