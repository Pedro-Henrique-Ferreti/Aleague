<template>
  <div class="flex items-center justify-between mb-1">
    <AppButton
      class="btn-ghost px-0.5"
      label="Voltar"
      :icon-left="IconArrowNarrowLeft"
      @click="store.showPreviousStep"
    />
    <div class="flex items-center gap-0.75">
      <AppTooltip
        class="tooltip-left"
        label="Gerar novamente"
      >
        <AppButton
          class="btn-square btn-accent btn-soft"
          aria-label="Gerar novamente"
          :icon-left="IconRefresh"
          @click="store.getNewMatchweeks"
        />
      </AppTooltip>
    </div>
  </div>
  <div class="grid gap-1 gap-y-1.5 tablet-md:grid-cols-2 desktop:grid-cols-3">
    <MatchweekFormModalPreviewCard
      v-for="matchweek in store.matchweeks"
      :key="matchweek.week"
      :matchweek="matchweek"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconArrowNarrowLeft, IconRefresh } from '@tabler/icons-vue';

const store = useMatchweekFormStore();
</script>
