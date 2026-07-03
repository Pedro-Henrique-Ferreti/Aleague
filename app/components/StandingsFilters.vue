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
    <template v-if="matchweeksCount > 0">
      <BaseSelect
        v-model="form.weekDirection"
        class="select-sm max-w-8"
        :options="WEEK_DIRECTION_OPTIONS"
      />
      <BaseSelect
        v-model="form.week"
        class="select-sm max-w-8"
        :options="weekOptions"
      />
    </template>
    <BaseSelect
      v-if="showEntryViewInput"
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

<script setup lang="ts">
import { IconRestore } from '@tabler/icons-vue';

defineEmits<{ reset: [] }>();

const stageStore = useStageStore();

const form = defineModel<StandingsFilters>({ required: true });

const matchweeksCount = computed(() => stageStore.activeGroupStage?.matchweeks.length ?? 0);
const showEntryViewInput = computed(() => (stageStore.activeGroupStage?.groups.length ?? 0) > 1);

const weekOptions = computed<SelectOptionList<StandingsFilters['week']>>(() => [
  DEFAULT_WEEK_OPTION,
  ...createArray(matchweeksCount.value, i => ({
    label: `Rodada ${i + 1}`,
    value: i + 1,
  })),
]);
</script>
