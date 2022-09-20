<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Bem-vindo a criação de campeonatos! Para começar, escolha nome e formato para o seu campeonato.</p>
  </PageHeader>
  <CreateLeagueStepper :current-step="1" />
  <CreateLeagueLayout>
    <CreateLeagueForm @submit="submitForm">
      <AppTransition name="fade">
        <LoadingIndicator v-if="isLoadingLeague" />
        <div v-else>
          <AppLargeField
            v-model.trim="league.name"
            placeholder="Digite o nome do campeonato"
            icon="football"
          />
          <div class="league-format-form">
            <h2 class="league-format-form__title">
              Escolha o formato
            </h2>
            <div class="league-format-form__format-grid">
              <CreateLeagueFormatCard
                v-for="(competition, index) in Object.values(COMPETITION_FORMATS)"
                v-model="league.format"
                :key="index"
                :value="competition.value"
                :image="competition.image"
                :label="competition.name"
                :id="`league-format--${competition.value}`"
              />
            </div>
            <p class="league-format-form__format-description">
              {{ selectedFormat?.description || '' }}
            </p>
            <AppWarning
              v-if="selectedFormat && !selectedFormat.isAvailable"
              class="league-format-form__warning"
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
    </CreateLeagueForm>
  </CreateLeagueLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { COMPETITION_FORMATS } from '@/constants';

import AppLargeField from '@/components/AppLargeField.vue';
import AppWarning from '@/components/AppWarning.vue';
import PageHeader from '@/components/PageHeader.vue';
import CreateLeagueStepper from '@/components/CreateLeagueStepper.vue';
import CreateLeagueForm from '@/components/CreateLeagueForm.vue';
import CreateLeagueLayout from '@/components/CreateLeagueLayout.vue';
import CreateLeagueFormatCard from '@/components/CreateLeagueFormatCard.vue';
import AppTransition from '../components/AppTransition.vue';
import LoadingIndicator from '../components/LoadingIndicator.vue';

const router = useRouter();
const route = useRoute();
const leaguesStore = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

// League data
const league = ref({
  name: '',
  format: '',
});
const isLoadingLeague = ref(!!route.params.id);

getLeague();

async function getLeague() {
  if (!route.params.id) return;

  try {
    const { name } = await leaguesStore.getLeague(route.params.id as string);

    league.value.name = name;
    league.value.format = COMPETITION_FORMATS.league.value;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeague.value = false;
  }
}

const selectedFormat = computed(() => {
  return Object.values(COMPETITION_FORMATS).find(({ value }) => value === league.value.format);
});

const formIsValid = computed(() => {
  return league.value.name && selectedFormat.value?.isAvailable;
});

// Create league
const isSavingLeague = ref(false);

async function submitForm() {
  if (!formIsValid.value) return;

  isSavingLeague.value = true;

  try {
    const hashId = await leaguesStore.createLeague({ name: league.value.name });

    router.push({
      name: 'create-league-rules',
      params: { id: hashId },
    });
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isSavingLeague.value = false;
  }
}
</script>

<style lang="scss" scoped>
.league-format-form {
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
