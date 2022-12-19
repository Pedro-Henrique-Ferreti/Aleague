<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Bem-vindo a criação de campeonatos! Para começar, escolha nome e formato para o seu campeonato.</p>
  </PageHeader>
  <CompetitionStepper :current-step="1" />
  <CompetitionLayout>
    <CompetitionForm @submit="submitForm">
      <AppTransition name="fade">
        <LoadingIndicator v-if="isLoadingLeagueData" />
        <div v-else>
          <AppLargeField
            v-model.trim="leagueName"
            placeholder="Digite o nome do campeonato"
            icon="football"
          />
          <div class="competition-format-form">
            <h2 class="competition-format-form__title">
              Escolha o formato
            </h2>
            <div class="competition-format-form__format-grid">
              <CompetitionFormatCard
                v-for="(competition, index) in Object.values(competitionFormats)"
                v-model="leagueFormat"
                :key="index"
                :value="competition.value"
                :image="competition.image"
                :label="competition.name"
                :id="`competition-format--${competition.value}`"
              />
            </div>
            <p class="competition-format-form__format-description">
              {{ selectedFormat?.description || '' }}
            </p>
            <AppWarning
              v-if="selectedFormat && !selectedFormat.isAvailable"
              class="competition-format-form__warning"
              message="Esse formato de campeonato não está disponível no momento."
            />
          </div>
        </div>
      </AppTransition>
      <template #footer>
        <AppButton
          color="gray"
          :to="{ name: 'leagues' }"
        >
          Voltar
        </AppButton>
        <AppButton
          :is-loading="isSavingLeague"
          :disabled="!formIsValid"
        >
          Próximo passo
        </AppButton>
      </template>
    </CompetitionForm>
  </CompetitionLayout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { competitionFormats } from '@/constants/competitionFormats';

import AppLargeField from '@/components/AppLargeField.vue';
import AppTransition from '@/components/AppTransition.vue';
import AppWarning from '@/components/AppWarning.vue';
import PageHeader from '@/components/PageHeader.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import CompetitionStepper from '@/components/CompetitionStepper.vue';
import CompetitionForm from '@/components/CompetitionForm.vue';
import CompetitionLayout from '@/components/CompetitionLayout.vue';
import CompetitionFormatCard from '@/components/CompetitionFormatCard.vue';

const emit = defineEmits(['update:league-name', 'update:league-format', 'submit']);
const props = defineProps({
  isLoadingLeagueData: {
    type: Boolean,
    default: false,
  },
  isSavingLeague: {
    type: Boolean,
    default: false,
  },
  leagueName: {
    type: String,
    default: '',
  },
  leagueFormat: {
    type: String,
    default: '',
  },
});

// Form inputs
const leagueName = computed({
  get() {
    return props.leagueName;
  },
  set(value) {
    emit('update:league-name', value);
  },
});

const leagueFormat = computed({
  get() {
    return props.leagueFormat;
  },
  set(value) {
    emit('update:league-format', value);
  },
});

const selectedFormat = computed(() => {
  return Object.values(competitionFormats).find(({ value }) => value === leagueFormat.value);
});

const formIsValid = computed(() => {
  return leagueName.value && selectedFormat.value?.isAvailable;
});

// Submit form
function submitForm() {
  if (!formIsValid.value) return;

  emit('submit');
}
</script>

<style lang="scss" scoped>
.competition-format-form {
  margin-top: 2.5rem;
  &__title {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
  }
  &__format-grid {
    display: grid;
    gap: 1rem;
    @include for-tablet-portrait-up {
      grid-template-columns: repeat(2, 1fr);
    }
    @include for-desktop-up {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  }
  &__format-description {
    margin-top: 1.5rem;
  }
  &__warning {
    margin-top: 1.5rem;
  }
  @include for-tablet-landscape-up {
    margin-top: 3.5rem;
  }
}
</style>
