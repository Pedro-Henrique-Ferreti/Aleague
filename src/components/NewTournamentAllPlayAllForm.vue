<template>
  <div class="form">
    <p>
      Para um campeonato de pontos corridos, você deve escolher a quantidade
      de turnos e equipes participantes.
    </p>
    <AppCounter
      v-model="form.participants"
      class="form__counter"
      label="Quantidade de equipes participantes"
      :step="2"
      :min="ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS"
      :max="ALL_PLAY_ALL_MAX_NUMBER_OF_PARTICIPANTS"
    />
    <AppToggle
      v-model="form.isDoubleLegged"
      text="Campeonato em dois turnos"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS,
  ALL_PLAY_ALL_MAX_NUMBER_OF_PARTICIPANTS,
} from '@/constants/tournament';
import api from '@/api';
import AppCounter from './AppCounter.vue';
import AppToggle from './AppToggle.vue';

// Form
const form = ref({
  participants: ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS,
  isDoubleLegged: false,
});

function createTournament(tournament: { name: string; iconId: number }) {
  return api.tournamentService.createAllPlayAllTournament({
    name: tournament.name,
    icon: tournament.iconId,
    numberOfTeams: form.value.participants,
    isDoubleLegged: form.value.isDoubleLegged,
  });
}

// Exposed values
defineExpose({ createTournament });
</script>

<style lang="scss" scoped>
.form {
  &__counter {
    margin-top: 2rem;
    margin-bottom: 2.5rem;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
