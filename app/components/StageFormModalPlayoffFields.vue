<template>
  <div class="grid grid-cols-2 gap-x-1">
    <AppCounter
      v-model="teams"
      label="Equipes participantes"
      :step="2"
      :min="MIN_TEAMS"
      :disabled="disabled"
    />
    <AppCounter
      v-model="playoffRounds"
      label="Número de rodadas"
      :step="1"
      :min="MIN_ROUNDS"
      :max="maxPlayoffRounds"
      :disabled="disabled"
    />
    <div class="alert col-span-2 mt-1 text-xs font-semibold">
      <IconInfoCircle class="text-primary shrink-0" />
      <div class="flex flex-wrap gap-x-0.25">
        <span
          v-for="name in getPlayoffRoundNames(playoffRounds, teams)"
          :key="name"
          class="last:[&_svg]:hidden"
        >
          {{ name }}
          <IconArrowBadgeRightFilled class="inline size-1 -translate-y-px" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconArrowBadgeRightFilled, IconInfoCircle } from '@tabler/icons-vue';
import { getPlayoffRoundNames } from '~/helpers/playoff';

defineProps<{
  disabled: boolean;
  maxPlayoffRounds: number;
}>();

const { MIN_TEAMS, MIN_ROUNDS } = StageConstants;

const teams = defineModel<StageForm['teams']>('teams', { required: true });
const playoffRounds = defineModel<StageForm['playoffRounds']>('playoff-rounds', { required: true });
</script>
