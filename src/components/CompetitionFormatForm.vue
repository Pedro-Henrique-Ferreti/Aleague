<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Bem-vindo a criação de campeonatos! Para começar, escolha nome e formato para o seu campeonato.</p>
  </PageHeader>
  <CompetitionFormStepper :current-step="1" />
  <CompetitionFormLayout>
    <CompetitionForm @submit="submitForm">
      <AppTransition name="fade">
        <LoadingIndicator v-if="isLoadingCompetition" />
        <div v-else>
          <AppLargeField
            v-model.trim="competitionName"
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
                v-model="competitionFormat"
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
          :is-loading="isSavingCompetition"
          :disabled="isLoadingCompetition || !formIsValid"
        >
          Próximo passo
        </AppButton>
      </template>
    </CompetitionForm>
  </CompetitionFormLayout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { competitionFormats } from '@/constants/competitions';

import AppLargeField from './AppLargeField.vue';
import AppTransition from './AppTransition.vue';
import AppWarning from './AppWarning.vue';
import PageHeader from './PageHeader.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import CompetitionFormStepper from './CompetitionFormStepper.vue';
import CompetitionForm from './CompetitionForm.vue';
import CompetitionFormLayout from './CompetitionFormLayout.vue';
import CompetitionFormatCard from './CompetitionFormatCard.vue';

const emit = defineEmits(['update:competition-name', 'update:competition-format', 'submit']);
const props = defineProps({
  isLoadingCompetition: {
    type: Boolean,
    default: false,
  },
  isSavingCompetition: {
    type: Boolean,
    default: false,
  },
  competitionName: {
    type: String,
    default: '',
  },
  competitionFormat: {
    type: String,
    default: '',
  },
});

// Form inputs
const competitionName = computed({
  get() {
    return props.competitionName;
  },
  set(value) {
    emit('update:competition-name', value);
  },
});

const competitionFormat = computed({
  get() {
    return props.competitionFormat;
  },
  set(value) {
    emit('update:competition-format', value);
  },
});

const selectedFormat = computed(() => {
  return Object.values(competitionFormats).find(({ value }) => value === competitionFormat.value);
});

const formIsValid = computed(() => {
  return competitionName.value && selectedFormat.value?.isAvailable;
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
