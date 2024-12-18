<template>
  <div class="settings">
    <form
      class="settings__form"
      @click.prevent
    >
      <AppCard title="Configurações">
        <div class="settings__form-fields">
          <div class="settings__form-row">
            <TournamentSettingsIconInput v-model="form.iconId" />
            <AppInput
              v-model.trim="form.name"
              id="edit-tournament--name"
              label="Nome do campeonato"
            />
          </div>
          <AppToggle
            id="edit-tournament--show-team-emblems"
            text="Exibir escudos das equipes"
          />
          <AppToggle
            id="edit-tournament--show-team-country"
            text="Exibir nacionalidades das equipes"
          />
        </div>
      </AppCard>
      <AppButton
        class="settings__form-button"
        type="submit"
      >
        Salvar alterações
      </AppButton>
    </form>
    <AppCard title="Mais opções">
      <div class="settings__tournament-details">
        <p>
          Campeonato criado em
          <span class="settings__tournament-details-date">
            {{ formatDate(tournament.createdAt, 'd MMMM yyyy') }}
          </span>
        </p>
        <p>
          Última atualização em
          <span class="settings__tournament-details-date">
            {{ formatDate(tournament.updatedAt, 'd MMMM yyyy') }}
          </span>
        </p>
      </div>
      <div class="settings__buttons">
        <AppButton color="secondary">
          Reiniciar campeonato
        </AppButton>
        <AppButton color="danger">
          Excluir campeonato
        </AppButton>
      </div>
    </AppCard>
  </div>
</template>

<script lang="ts" setup>
import type { Tournament } from '@/types/Tournament';
import { ref, type PropType } from 'vue';
import { formatDate } from '@/utils';
import AppButton from './AppButton.vue';
import AppCard from './AppCard.vue';
import AppInput from './AppInput.vue';
import AppToggle from './AppToggle.vue';
import TournamentSettingsIconInput from './TournamentSettingsIconInput.vue';

const props = defineProps({
  tournament: {
    type: Object as PropType<Tournament>,
    required: true,
  },
});

const form = ref({
  name: props.tournament.name,
  iconId: props.tournament.icon,
});
</script>

<style lang="scss" scoped>
.settings {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  &__form-fields {
    display: grid;
    gap: 1rem;
  }
  &__form-row {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 0.5rem;
    @include for-tablet-portrait-up {
      grid-template-columns: auto 1fr;
    }
  }
  &__form-button {
    margin-left: auto;
  }
  &__tournament-details {
    display: grid;
    gap: 1rem;
    color: $color--text-strong;
    @include for-tablet-portrait-up {
      grid-template-columns: 1fr 1fr;
    }
  }
  &__tournament-details-date {
    display: block;
    margin-top: 0.25rem;
    color: $color--text;
    font-size: 0.875rem;
  }
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
