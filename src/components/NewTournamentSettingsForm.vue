<template>
  <div class="settings-form">
    <TournamentSettingsIconInput v-model="iconId" />
    <div>
      <AppInput
        v-model.trim="tournamentName"
        id="new-tournament--name"
        label="Nome do campeonato"
      />
      <div class="settings-form__format">
        <span class="settings-form__label">
          Formato do campeonato
        </span>
        <div class="settings-form__format-cards">
          <AppSelectionCard
            v-model="format"
            text="Pontos corridos"
            :icon="IconMedal"
            :value="TournamentFormat.ALL_PLAY_ALL"
          />
          <AppSelectionCard
            v-model="format"
            text="Eliminatórias"
            :icon="IconPlayoff"
            :value="TournamentFormat.PLAYOFFS"
          />
          <AppSelectionCard
            v-model="format"
            text="Customizado"
            :icon="IconTrophy"
            :value="TournamentFormat.CUSTOM"
          />
          <p v-if="format === TournamentFormat.ALL_PLAY_ALL">
            Cada um dos competidores enfrenta todos os demais. Ao final, aquele que obtiver mais
            pontos é o campeão. Pode ser disputado em turno único ou em
            dois turnos (turno e returno).
          </p>
          <p v-else-if="format === TournamentFormat.PLAYOFFS">
            Cada equipe competidora disputa um certo número de partidas, até ser promovida à
            próxima fase. A equipe perdedora de cada disputa é eliminada da competição.
          </p>
          <p v-else-if="format === TournamentFormat.CUSTOM">
            Você pode combinar fase de grupos e eliminações para criar um campeonato customizado.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TournamentFormat } from '@/constants/tournament';
import IconMedal from '@/assets/icons/Medal.svg';
import IconPlayoff from '@/assets/icons/Playoff.svg';
import IconTrophy from '@/assets/icons/Trophy.svg';
import AppInput from './AppInput.vue';
import AppSelectionCard from './AppSelectionCard.vue';
import TournamentSettingsIconInput from './TournamentSettingsIconInput.vue';

const tournamentName = defineModel('tournamentName', { type: String, required: true });
const iconId = defineModel('iconId', { type: Number, required: true });
const format = defineModel('format', { type: String, required: true });
</script>

<style lang="scss" scoped>
.settings-form {
  display: grid;
  gap: 1.5rem;
  @include for-tablet-portrait-up {
    grid-template-columns: auto 1fr;
  }
  &__format {
    margin-top: 1.5rem;
  }
  &__label {
    display: block;
    margin-bottom: 0.5rem;
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__format-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
