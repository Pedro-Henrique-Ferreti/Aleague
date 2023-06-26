<template>
  <div class="competition-card">
    <div class="competition-card__details">
      <router-link
        class="competition-card__icon-link | focus-ring"
        :to="cardPath"
      >
        <img
          class="competition-card__icon"
          alt="Competition format icon"
          :src="format?.image"
        />
      </router-link>
      <div>
        <router-link
          class="competition-card__title | focus-ring"
          :data-margin="showDeleteButton"
          :to="cardPath"
        >
          {{ title }}
        </router-link>
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
        {{ progress === 100 ? 'Campeonato concluído' : 'Andamento do campeonato' }}
      </span>
      <AppProgressBar :value="progressBarValue" />
    </div>
    <div class="competition-card__button-wrapper">
      <AppIconButton
        v-if="showDeleteButton"
        aria-label="Excluir campeonato"
        title="Excluir campeonato"
        icon="trash-can-outline"
        @click="$emit('delete')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CompetitionFormat, CreateCompetitionSteps } from '@/types/Competition';
import { computed, ref, watch, type PropType } from 'vue';
import { getFullDate } from '@/utils';
import { competitionFormats } from '@/constants/competitionFormats';

import AppIconButton from './AppIconButton.vue';
import AppProgressBar from './AppProgressBar.vue';
import LeagueCardDataItem from './LeagueCardDataItem.vue';
import LeagueCardStepper from './LeagueCardStepper.vue';

defineEmits(['delete']);
const props = defineProps({
  id: {
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
    return { name: 'view-league', params: { id: props.id } };
  }

  if (props.stepsCompleted.second) {
    return { name: 'create-league-participants', params: { id: props.id } };
  }

  return { name: 'create-league-rules', params: { id: props.id } };
}

function getPlayoffPath() {
  if (props.stepsCompleted.third) {
    return { name: 'view-playoff', params: { id: props.id } };
  }

  if (props.stepsCompleted.second) {
    return { name: 'create-playoff-participants', params: { id: props.id } };
  }

  return { name: 'create-playoff-rules', params: { id: props.id } };
}

// Show delete button
const showDeleteButton = computed(() => !props.stepsCompleted.third);
</script>

<style lang="scss" scoped>
.competition-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.5rem;
  position: relative;
  transition: box-shadow $transition--fast ease-in-out;
  &:hover {
    box-shadow: $shadow--medium;
  }
  &__details {
    display: flex;
    gap: 1rem;
    width: 100%;
  }
  &__icon-link {
    height: fit-content;
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
    &[data-margin="true"] {
      margin-right: 2rem;
    }
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
  &__button-wrapper {
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
  }
}
</style>
