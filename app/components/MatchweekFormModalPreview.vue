<template>
  <div class="mb-1">
    <AppButton
      class="btn-ghost px-0.5"
      label="Voltar"
      :icon-left="IconArrowNarrowLeft"
      @click="$emit('showPrevious')"
    />
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
import { IconArrowNarrowLeft } from '@tabler/icons-vue';
import { createMatchweeks } from '~/helpers/tournament';

const props = defineProps<{
  rules: RulesForm;
  groups: GroupStage['groups'];
}>();

defineEmits<{ showPrevious: [] }>();

const matchweeks = ref(
  createMatchweeks(props.groups, props.rules.format, props.rules.roundRobins),
);

defineExpose({ matchweeks });
</script>
