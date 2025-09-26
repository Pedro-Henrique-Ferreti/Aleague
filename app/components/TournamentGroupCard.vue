<template>
  <section class="card card-border">
    <div class="card-body gap-0 p-1.25">
      <header class="flex justify-between">
        <div class="text-xl font-medium">{{ title }}</div>
        <AppButton
          v-if="showFilters"
          class="btn-square btn-ghost w-2 h-2"
          :icon-left="IconAdjustmentsHorizontal"
          @click="filtersVisible = !filtersVisible"
        />
      </header>
      <TournamentGroupCardFilters
        v-if="showFilters"
        v-show="filtersVisible"
      />
      <div class="divider" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { IconAdjustmentsHorizontal } from '@tabler/icons-vue';

defineProps<{
  title: string;
  standings: StandingsEntry[];
  showFilters?: boolean;
}>();

const filtersVisible = ref(false);
</script>
