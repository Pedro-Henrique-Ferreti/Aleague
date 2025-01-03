<template>
  <div class="form">
    <p>
      Para um campeonato eliminatório, você deve escolher o número de
      rodadas. Com base nisso, o sistema mostrará a quantidade de equipes participantes.
    </p>
    <div class="form__counter-wrapper">
      <AppCounter
        v-model="form.rounds"
        label="Número de rodadas"
        :min="PLAYOFFS_MIN_NUMBER_OF_ROUNDS"
        :max="PLAYOFFS_MAX_NUMBER_OF_ROUNDS"
      />
      <AppCounter
        readonly
        label="Equipes participantes"
        :model-value="2 ** form.rounds"
      />
    </div>
    <div class="form__toggles">
      <AppToggle
        v-model="form.isDoubleLegged"
        text="Partidas de ida e volta"
      />
      <AppToggle
        v-model="form.finalRoundIsDoubleLegged"
        text="Final em duas partidas"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  PLAYOFFS_MIN_NUMBER_OF_ROUNDS, PLAYOFFS_MAX_NUMBER_OF_ROUNDS,
} from '@/constants/tournament';
import api from '@/api';
import AppCounter from './AppCounter.vue';
import AppToggle from './AppToggle.vue';

// Form
const form = ref({
  rounds: PLAYOFFS_MIN_NUMBER_OF_ROUNDS,
  isDoubleLegged: false,
  finalRoundIsDoubleLegged: false,
});

function createTournament(tournament: { name: string; iconId: number }) {
  return api.tournamentService.createPlayoffsTournament({
    name: tournament.name,
    icon: tournament.iconId,
    numberOfTeams: 2 ** form.value.rounds,
    isDoubleLegged: form.value.isDoubleLegged,
    finalRoundIsDoubleLegged: form.value.finalRoundIsDoubleLegged,
  });
}

// Exposed values
defineExpose({ createTournament });
</script>

<style lang="scss" scoped>
.form {
  &__counter-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3.5rem;
    margin-top: 2rem;
    margin-bottom: 2.5rem;
  }
  &__toggles {
    display: grid;
    gap: 1rem;
  }
}
</style>
