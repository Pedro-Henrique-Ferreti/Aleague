<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Agora você deve escolher as regras para o seu campeonato <b>{{ formatName }}</b>.</p>
  </PageHeader>
  <CreateLeagueStepper :current-step="2" />
  <!-- <CreateLeagueLayout>
    <CreateLeagueForm @submit="submitForm">
      <AppTransition name="fade">
        <LoadingIndicator v-if="isLoadingLeague" />
        <div v-else>
          <CreateLeagueFormHeader :league-name="league.name" />
          <div class="league-rules-form">
            <div class="league-rules-form__row">
              <label
                class="league-rules-form__label"
                id="rules-form-participants"
              >
                Quantidade de participantes
              </label>
              <AppCounterField
                v-model="league.numberOfTeams"
                labelled-by="rules-form-participants"
                :min="1"
              />
            </div>
            <div class="league-rules-form__row">
              <label
                id="rules-form-away-games"
                class="league-rules-form__label"
              >
                Campeonato em 2 turnos
              </label>
              <AppSwitch
                v-model="league.awayGames"
                show-labels
                labelled-by="rules-form-away-games"
              />
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
        <AppButton
          :is-loading="isSavingLeague"
          :disabled="!formIsValid"
        >
          Próximo passo
        </AppButton>
      </template>
    </CreateLeagueForm>
  </CreateLeagueLayout> -->
</template>

<script lang="ts" setup>
import { computed } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
import { competitionFormats } from '@/constants/competitionFormats';
// import { useLeaguesStore } from '@/stores/leaguesStore';
// import { useNotificationStore } from '@/stores/notificationStore';

// import AppCounterField from '@/components/AppCounterField.vue';
// import AppTransition from '@/components/AppTransition.vue';
// import AppSwitch from '@/components/AppSwitch.vue';
import PageHeader from '@/components/PageHeader.vue';
// import LoadingIndicator from '@/components/LoadingIndicator.vue';
// import CreateLeagueLayout from '@/components/CreateLeagueLayout.vue';
// import CreateLeagueForm from '@/components/CreateLeagueForm.vue';
import CreateLeagueStepper from '@/components/CreateLeagueStepper.vue';
// import CreateLeagueFormHeader from '@/components/CreateLeagueFormHeader.vue';

const props = defineProps({
  leagueFormat: {
    type: String,
    default: '',
  },
});

const formatName = computed(() => {
  return Object.values(competitionFormats).find(
    ({ value }) => value === props.leagueFormat,
  )?.name || '';  
});
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
