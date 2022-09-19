<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Agora você deve escolher as regras para o seu campeonato <b>pontos corridos</b>.</p>
  </PageHeader>
  <CreateLeagueStepper :current-step="2" />
  <CreateLeagueLayout>
    <CreateLeagueForm>
      <AppTransition name="fade">
        <LoadingIndicator v-if="isLoadingLeague" />
        <div v-else>
          <CreateLeagueFormHeader :league-name="leagueName" />
          <div class="league-rules-form">
            <div class="league-rules-form__row">
              <span class="league-rules-form__label">
                Quantidade de participantes
              </span>
            </div>
            <div class="league-rules-form__row">
              <span class="league-rules-form__label">
                Campeonato em 2 turnos
              </span>
            </div>
          </div>
        </div>
      </AppTransition>
      <template #footer>
        <AppButton
          color="gray"
          :to="{ name: 'create-league-format', params: { id: $route.params.id }}"
        >
          Voltar
        </AppButton>
        <AppButton>Próximo passo</AppButton>
      </template>
    </CreateLeagueForm>
  </CreateLeagueLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { useNotificationStore } from '@/stores/notificationStore';

import AppTransition from '@/components/AppTransition.vue';
import PageHeader from '@/components/PageHeader.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import CreateLeagueLayout from '@/components/CreateLeagueLayout.vue';
import CreateLeagueForm from '@/components/CreateLeagueForm.vue';
import CreateLeagueStepper from '@/components/CreateLeagueStepper.vue';
import CreateLeagueFormHeader from '@/components/CreateLeagueFormHeader.vue';

const route = useRoute();
const leaguesStore = useLeaguesStore();
const { openSnackbarNotification } = useNotificationStore();

const isLoadingLeague = ref(true);

// League data
const leagueName = ref('');

getLeague();

async function getLeague() {
  isLoadingLeague.value = true;

  try {
    const { name } = await leaguesStore.getLeague(route.params.id as string);

    leagueName.value = name;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingLeague.value = false;
  }
}
</script>

<style lang="scss" scoped>
.league-rules-form {
  margin-top: 3rem;
  &__row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &:not(:last-of-type) {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid $color--light-gray-1;
    }
    @include for-tablet-portrait-up {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__label {
    color: $color--text-darken;
  }
}
</style>
