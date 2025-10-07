<template>
  <section class="card card-border h-fit">
    <div class="card-body gap-0 p-1.25">
      <MatchweekCardEmptyState
        v-if="stage.matchweeks.length === 0"
        :stage="stage"
      />
      <template v-else>
        <header class="flex justify-center gap-1 items-center mb-1.5 border-b-gray-200 border-b pb-1">
          <div class="tooltip" data-tip="Rodada anterior">
            <AppButton
              class="btn-square btn-sm btn-ghost"
              :icon-left="IconChevronLeft"
              :disabled="currentMatchweek <= 1"
              @click="currentMatchweek -= 1"
            />
          </div>
          <BaseSelect
            v-model="currentMatchweek"
            class="select-ghost w-7 p-0 justify-center h-2 bg-[url()] font-semibold text-lg [&_option]:font-normal [&_option]:textarea-md"
            :options="matchweeksOptions"
          />
          <div class="tooltip" data-tip="Próxima rodada">
            <AppButton
              class="btn-square btn-sm btn-ghost"
              :icon-left="IconChevronRight"
              :disabled="currentMatchweek >= stage.matchweeks.length"
              @click="currentMatchweek += 1"
            />
          </div>
        </header>
        <div class="grid gap-1">
          <template
            v-for="match in stage.matchweeks[currentMatchweek - 1]!.matches"
            :key="match.id"
          >
            <MatchCard
              v-model:home-score="match.homeTeam.score"
              v-model:away-score="match.awayTeam.score"
              :match="match"
              @match-updated="$emit('match-updated', $event)"
            />
          </template>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';
import type { MatchCardEmits } from './MatchCard.vue';

defineEmits<Pick<MatchCardEmits, 'match-updated'>>();

const stage = defineModel<TournamentGroupsStage>({ required: true });

const currentMatchweek = ref(
  stage.value.matchweeks.find(
    (i) => i.matches.some((m) => m.homeTeam.score === null || m.awayTeam.score === null)
  )?.week || 1,
);

const matchweeksOptions = computed<SelectOptionList<number>>(() => stage.value.matchweeks.map((i) => ({
  label: `Rodada ${i.week}`,
  value: i.week,
})));
</script>
