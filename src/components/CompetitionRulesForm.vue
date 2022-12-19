<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>
      Agora você deve escolher as regras para o seu campeonato
      <b>{{ leagueFormat?.name.toLowerCase() }}</b>.
    </p>
  </PageHeader>
  <CompetitionStepper :current-step="2" />
  <CompetitionLayout>
    <CompetitionForm @submit="submitForm">
      <AppTransition name="fade">
        <LoadingIndicator v-if="isLoadingLeague" />
        <div v-else>
          <CompetitionFormHeader
            :league-name="leagueName"
            :league-icon="leagueFormat?.image"
            :league-format="leagueFormat?.name"
          />
          <div class="league-rules-form">
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

import AppTransition from '@/components/AppTransition.vue';
import PageHeader from '@/components/PageHeader.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import CompetitionLayout from '@/components/CompetitionLayout.vue';
import CompetitionForm from '@/components/CompetitionForm.vue';
import CompetitionStepper from '@/components/CompetitionStepper.vue';
import CompetitionFormHeader from '@/components/CompetitionFormHeader.vue';

const emit = defineEmits(['submit']);
const props = defineProps({
  isLoadingLeague: {
    type: Boolean,
    default: false,
  },
  isSavingLeague: {
    type: Boolean,
    default: false,
  },
  formIsValid: {
    type: Boolean,
    default: true,
  },
  leagueFormat: {
    type: String,
    required: true,
  },
  leagueName: {
    type: String,
    required: true,
  },
  backButtonRoute: {
    type: [String, Object],
    required: true,
  },
});

const leagueFormat = computed(() => Object.values(competitionFormats).find(
  ({ value }) => value === props.leagueFormat,
));

function submitForm() {
  if (!props.formIsValid) return;

  emit('submit');
}
</script>

<style lang="scss" scoped>
.league-rules-form {
  margin-top: 3rem;
}
</style>
