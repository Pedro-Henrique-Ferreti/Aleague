<template>
  <router-link
    class="competition-card__link"
    :to="cardPath"
    :title="title"
  >
    <div class="competition-card">
      <div class="competition-card__details">
        <img
          class="competition-card__icon"
          alt="Competition format icon"
          :src="format?.image"
        />
        <div>
          <span class="competition-card__title">
            {{ title }}
          </span>
          <ul class="competition-card__list">
            <LeagueCardDataItem icon="football">
              {{ format?.name }}
            </LeagueCardDataItem>
            <LeagueCardDataItem
              icon="people"
              :warning="!teamsCount"
            >
              {{ teamsCountLabel }}
            </LeagueCardDataItem>
            <LeagueCardDataItem icon="calendar-check">
              Criado em {{ getFullDate(createdAt) }}
            </LeagueCardDataItem>
            <LeagueCardDataItem
              v-if="stepsCompleted.third"
              icon="calendar-edit"
            >
              Última alteração em {{ getFullDate(updatedAt) }}
            </LeagueCardDataItem>
          </ul>
        </div>
      </div>
      <LeagueCardStepper
        v-if="!stepsCompleted.third"
        :steps="leagueSteps"
      />
      <div
        v-else
        class="competition-card__league-progress"
      >
        <span class="competition-card__league-progress-title">
          Andamento do campeonato
        </span>
        <AppProgressBar :value="progressBarValue" />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import type { CompetitionFormat, CreateCompetitionSteps } from '@/types/Competition';
import { computed, ref, watch, type PropType } from 'vue';
import { getFullDate } from '@/utils';
import { competitionFormats } from '@/constants/competitionFormats';

import AppProgressBar from './AppProgressBar.vue';
import LeagueCardDataItem from './LeagueCardDataItem.vue';
import LeagueCardStepper from './LeagueCardStepper.vue';

const props = defineProps({
  hashId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  competitionFormat: {
    type: String as PropType<CompetitionFormat>,
    required: true,
  },
  teamsCount: {
    type: Number as PropType<number | null>,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  stepsCompleted: {
    type: Object as PropType<CreateCompetitionSteps>,
    required: true,
  },
  createdAt: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: String,
    default: '',
  },
});

const teamsCountLabel = computed(() => {
  if (!props.teamsCount) {
    return 'Nenhum participante';
  }

  if (props.teamsCount === 1) {
    return '1 participante';
  }

  return `${props.teamsCount} participantes`;
});

// Format data

const format = computed(() => Object.values(competitionFormats).find(
  ({ value }) => value === props.competitionFormat,
));

// League steps
const leagueSteps = computed(() => ([
  { name: 'Passo 1', complete: props.stepsCompleted.first },
  { name: 'Passo 2', complete: props.stepsCompleted.second },
  { name: 'Passo 3', complete: props.stepsCompleted.third },
]));

// League progress
const progressBarValue = ref(0);

setTimeout(setProgressBarValue);

watch(() => props.progress, setProgressBarValue);

function setProgressBarValue() {
  progressBarValue.value = props.progress;
}

// Card path
const cardPath = computed(() => {
  switch (props.competitionFormat) {
    case competitionFormats.LEAGUE.value:
      return getLeaguePath();
    case competitionFormats.PLAYOFF.name:
    default:
      return getPlayoffPath();
  }
});

function getLeaguePath() {
  if (props.stepsCompleted.third) {
    return { name: 'view-league', params: { id: props.hashId } };
  }

  if (props.stepsCompleted.second) {
    return { name: 'create-league-participants', params: { id: props.hashId } };
  }

  return { name: 'create-league-rules', params: { id: props.hashId } };
}

function getPlayoffPath() {
  if (props.stepsCompleted.third) {
    return { name: 'view-playoff', params: { id: props.hashId } };
  }

  if (props.stepsCompleted.second) {
    return { name: 'create-playoff-participants', params: { id: props.hashId } };
  }

  return { name: 'create-playoff-rules', params: { id: props.hashId } };
}
</script>

<style lang="scss" scoped>
.competition-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.5rem;
  box-shadow: $box-shadow--layer-1;
  transition: background-color $transition--fastest ease-in;
  &:hover {
    background-color: $color--light-gray-2;
  }
  &__link {
    @include focus-ring;
  }
  &__details {
    display: flex;
    gap: 1rem;
    width: 100%;
  }
  &__icon {
    --size: 3rem;
    width: var(--size);
    height: var(--size);
    @include for-large-tablet-landscape-up {
      --size: 4rem;
    }
  }
  &__title {
    display: block;
    margin-bottom: 0.5rem;
    color: $color--text-darken;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
  }
  &__list {
    display: grid;
    gap: 0.25rem;
  }
  &__league-progress {
    margin-top: 1rem;
  }
  &__league-progress-title {
    color: $color--text-darken;
  }
}
</style>
