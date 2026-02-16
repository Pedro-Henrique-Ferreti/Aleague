<template>
  <div class="flex items-center justify-between mb-1">
    <AppButton
      class="btn-ghost px-0.5"
      label="Voltar"
      :icon-left="IconArrowNarrowLeft"
      @click="$emit('showPrevious')"
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
          @click="getNewMatchweeks"
        />
      </AppTooltip>
    </div>
  </div>
  <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
    <MatchweekFormModalPreviewCard
      v-for="matchweek in matchweeks"
      :key="matchweek.week"
      :matchweek="matchweek"
    />
  </div>
</template>

<script lang="ts" setup>
import type { RulesForm } from './MatchweekFormModalRules.vue';
import { IconArrowNarrowLeft, IconRefresh } from '@tabler/icons-vue';
import { newGroupStageMatchweekList } from '~/helpers/stage';

const props = defineProps<{
  rules: RulesForm;
  groups: GroupStage['groups'];
}>();

defineEmits<{ showPrevious: [] }>();

const matchweeks = ref<Matchweek[]>([]);

function getNewMatchweeks() {
  matchweeks.value = newGroupStageMatchweekList(props.groups, props.rules.format, props.rules.roundRobins);
}

getNewMatchweeks();

defineExpose({ matchweeks });
</script>
