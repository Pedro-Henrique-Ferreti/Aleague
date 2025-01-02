<template>
  <div class="form">
    <p>
      Para um campeonato de pontos corridos, você deve escolher a quantidade
      de turnos e equipes participantes.
    </p>
    <AppCounter
      v-model="participants"
      class="form__counter"
      label="Quantidade de equipes participantes"
      :step="2"
      :min="ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS"
      :max="ALL_PLAY_ALL_MAX_NUMBER_OF_PARTICIPANTS"
    />
    <AppToggle
      v-model="isDoubleLegged"
      text="Campeonato em dois turnos"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS,
  ALL_PLAY_ALL_MAX_NUMBER_OF_PARTICIPANTS,
} from '@/constants/tournament';
import AppCounter from './AppCounter.vue';
import AppToggle from './AppToggle.vue';

const participants = defineModel('participants', { type: Number, required: true });
const isDoubleLegged = defineModel('isDoubleLegged', { type: Boolean, required: true });
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
