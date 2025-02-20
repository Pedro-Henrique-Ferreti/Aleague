<template>
  <main class="new-tournament | container-small">
    <PageHeader
      :title="pageTitle"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <form @submit.prevent="submitForm">
      <AppCard>
        <template #header>
          <AppProgressStepper :items="progressSteps" />
        </template>
        <template v-if="activeStepId === FormStep.RULES">
          <NewTournamentAllPlayAllForm
            v-if="settingsForm.format === TournamentFormat.ALL_PLAY_ALL"
            ref="allPlayAllForm"
          />
          <NewTournamentPlayoffsForm
            v-else-if="settingsForm.format === TournamentFormat.PLAYOFFS"
            ref="playoffsForm"
          />
          <div
            v-else-if="settingsForm.format === TournamentFormat.CUSTOM"
            class="new-tournament__custom-form-description"
          >
            <p>
              Você deve adicionar fases para o seu campeonato. Uma fase pode ter o formato em
              grupos ou eliminatório. Você também pode explorar a galeria de modelos e utilizar
              configurações dos campeonatos mais famosos.
            </p>
            <AppTextButton :icon-left="IconSearch">
              Explorar modelos
            </AppTextButton>
          </div>
        </template>
        <NewTournamentSettingsForm
          v-else
          v-model:tournament-name="settingsForm.name"
          v-model:icon-id="settingsForm.iconId"
          v-model:format="settingsForm.format"
        />
      </AppCard>
      <NewTournamentCustomForm
        v-if="activeStepId === FormStep.RULES && settingsForm.format === TournamentFormat.CUSTOM"
        ref="customForm"
      />
      <div class="new-tournament__controls">
        <template v-if="activeStepId === FormStep.RULES">
          <AppButton
            outline
            :icon-left="IconChevronLeft"
            @click="activeStepId = FormStep.FORMAT"
          >
            Voltar
          </AppButton>
          <AppButton
            type="submit"
            :is-loading="isCreatingTournament"
          >
            Criar campeonato
          </AppButton>
        </template>
        <AppButton
          v-else
          type="submit"
          :disabled="!settingsForm.name"
        >
          Continuar
        </AppButton>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { ProgressStepperStep } from '@/types/ProgressStepper';
import type { TypeTournamentFormat } from '@/types/Tournament';
import {
  computed, ref, useTemplateRef, watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '@/composables/toast';
import { NEW_TOURNAMENT_DEFAULT_ICON_ID, TournamentFormat } from '@/constants/tournament';
import IconChevronLeft from '@/assets/icons/ChevronLeft.svg';
import IconSearch from '@/assets/icons/Search.svg';
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppProgressStepper from '@/components/AppProgressStepper.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import PageHeader from '@/components/PageHeader.vue';
import NewTournamentSettingsForm from '@/components/NewTournamentSettingsForm.vue';
import NewTournamentAllPlayAllForm from '@/components/NewTournamentAllPlayAllForm.vue';
import NewTournamentPlayoffsForm from '@/components/NewTournamentPlayoffsForm.vue';
import NewTournamentCustomForm from '@/components/NewTournamentCustomForm.vue';

const router = useRouter();
const toast = useToast();

// Breadcrumb
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  'Novo',
];

// Form steps
const FormStep = {
  FORMAT: 0,
  RULES: 1,
} as const;

const activeStepId = ref<number>(FormStep.FORMAT);

const progressSteps = computed<ProgressStepperStep[]>(() => ([
  { name: 'Nome e formato', isCompleted: activeStepId.value === FormStep.RULES },
  { name: 'Definir regras', isCompleted: false },
]));

// Settings form
const settingsForm = ref({
  name: '',
  iconId: NEW_TOURNAMENT_DEFAULT_ICON_ID,
  format: TournamentFormat.ALL_PLAY_ALL as TypeTournamentFormat,
});

// Page title
const pageTitle = ref('');

watch(() => activeStepId.value, (currentStepId, previousStepId) => {
  pageTitle.value = (
    [currentStepId, previousStepId].includes(FormStep.RULES)
  ) ? settingsForm.value.name : 'Novo campeonato';
}, { immediate: true });

// Submit form
const allPlayAllFormRef = useTemplateRef('allPlayAllForm');
const playoffsFormRef = useTemplateRef('playoffsForm');
const customFormRef = useTemplateRef('customForm');
const isCreatingTournament = ref(false);

async function submitForm() {
  if (activeStepId.value === FormStep.FORMAT) {
    activeStepId.value = FormStep.RULES;
    return;
  }

  isCreatingTournament.value = true;

  try {
    let id = '';

    if (settingsForm.value.format === TournamentFormat.ALL_PLAY_ALL && allPlayAllFormRef.value) {
      const { data } = await allPlayAllFormRef.value.createTournament({
        name: settingsForm.value.name,
        iconId: settingsForm.value.iconId,
      });

      id = data.id;
    } else if (settingsForm.value.format === TournamentFormat.PLAYOFFS && playoffsFormRef.value) {
      const { data } = await playoffsFormRef.value.createTournament({
        name: settingsForm.value.name,
        iconId: settingsForm.value.iconId,
      });

      id = data.id;
    } else if (settingsForm.value.format === TournamentFormat.CUSTOM && customFormRef.value) {
      const { data } = await customFormRef.value.createTournament({
        name: settingsForm.value.name,
        iconId: settingsForm.value.iconId,
      });

      id = data.id;
    }

    toast.success('Campeonato criado com sucesso!');

    router.push({ name: 'show-tournament', params: { id } });
  } catch (error: any) {
    toast.error(
      (error.name !== 'AxiosError')
        ? error.message
        : 'Algo deu errado e não foi possível criar o campeonato. Por favor, tente novamente.',
    );
  } finally {
    isCreatingTournament.value = false;
  }
}
</script>

<style lang="scss" scoped>
.new-tournament {
  &__custom-form-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
  &__controls {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
