<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Bem-vindo a criação de campeonatos! Para começar, escolha nome e formato para o seu campeonato.</p>
  </PageHeader>
  <CreateLeagueStepper :current-step="1" />
  <CreateLeagueLayout>
    <CreateLeagueForm>
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
          {{ formatDescription }}
        </p>
        <AppWarning
          v-if="leagueFormatIsUnavailable"
          class="league-format-form__warning"
          message="Esse formato de campeonato não está disponível no momento."
        />
      </div>
      <template #footer>
        <AppButton
          color="gray"
          :to="{ name: 'leagues' }"
        >
          Voltar
        </AppButton>
        <AppButton :disabled="leagueFormatIsUnavailable">
          Próximo passo
        </AppButton>
      </template>
    </CreateLeagueForm>
  </CreateLeagueLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { COMPETITION_FORMATS } from '@/constants';

import AppLargeField from './AppLargeField.vue';
import AppWarning from './AppWarning.vue';
import PageHeader from './PageHeader.vue';
import CreateLeagueStepper from './CreateLeagueStepper.vue';
import CreateLeagueForm from './CreateLeagueForm.vue';
import CreateLeagueLayout from './CreateLeagueLayout.vue';
import CreateLeagueFormatCard from './CreateLeagueFormatCard.vue';

const league = ref({
  name: '',
  format: '',
});

const formatDescription = computed(() => {
  return Object.values(COMPETITION_FORMATS).find(
    ({ value }) => value === league.value.format,
  )?.description || '';
});

const leagueFormatIsUnavailable = computed(() => {
  const { cup, playOff } = COMPETITION_FORMATS;
  return [cup.value, playOff.value].includes(league.value.format);
});
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
