<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>
      Agora você deve escolher as regras para o seu campeonato
      <b>{{ format?.name.toLowerCase() }}</b>.
    </p>
  </PageHeader>
  <CompetitionFormStepper :current-step="2" />
  <CompetitionFormLayout>
    <CompetitionForm @submit="submitForm">
      <AppTransition name="fade">
        <LoadingIndicator v-if="isLoadingCompetition" />
        <div v-else>
          <CompetitionFormHeader
            :competition-name="competitionName"
            :competition-icon="format?.image"
            :competition-format-name="format?.name"
          />
          <div class="competition-rules-form">
            <slot />
          </div>
        </div>
      </AppTransition>
      <template #footer>
        <AppButton
          color="gray"
          :to="backButtonRoute"
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
import type { RouteLocationRaw } from 'vue-router';
import type { CompetitionFormat } from '@/types/Competition';
import { computed, type PropType } from 'vue';
import { competitionFormats } from '@/constants/competitions';

import AppTransition from './AppTransition.vue';
import PageHeader from './PageHeader.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import CompetitionFormLayout from './CompetitionFormLayout.vue';
import CompetitionForm from './CompetitionForm.vue';
import CompetitionFormStepper from './CompetitionFormStepper.vue';
import CompetitionFormHeader from './CompetitionFormHeader.vue';

const emit = defineEmits(['submit']);
const props = defineProps({
  isLoadingCompetition: {
    type: Boolean,
    default: false,
  },
  isSavingCompetition: {
    type: Boolean,
    default: false,
  },
  formIsValid: {
    type: Boolean,
    default: true,
  },
  competitionFormat: {
    type: String as PropType<CompetitionFormat>,
    required: true,
  },
  competitionName: {
    type: String,
    required: true,
  },
  backButtonRoute: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    required: true,
  },
});

const format = computed(() => Object.values(competitionFormats).find(
  ({ value }) => value === props.competitionFormat,
));

function submitForm() {
  if (!props.formIsValid) return;

  emit('submit');
}
</script>

<style lang="scss" scoped>
.competition-rules-form {
  margin-top: 3rem;
}
</style>
