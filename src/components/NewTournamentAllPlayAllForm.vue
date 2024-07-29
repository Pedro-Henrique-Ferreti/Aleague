<template>
  <div class="form">
    <p>
      Para um campeonato de pontos corridos, você deve escolher a quantidade
      de turnos e equipes participantes.
    </p>
    <AppCounter
      v-model="participantsValue"
      class="form__counter"
      label="Quantidade de equipes participantes"
      :step="2"
      :min="ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS"
      :max="ALL_PLAY_ALL_MAX_NUMBER_OF_PARTICIPANTS"
    />
    <AppToggle
      v-model="hasTwoLegsValue"
      id="all-play-all--two-legs"
      text="Campeonato em dois turnos"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS,
  ALL_PLAY_ALL_MAX_NUMBER_OF_PARTICIPANTS,
} from '@/constants/tournament';
import AppCounter from './AppCounter.vue';
import AppToggle from './AppToggle.vue';

const emit = defineEmits(['update:participants', 'update:hasTwoLegs']);
const props = defineProps({
  participants: {
    type: Number,
    required: true,
  },
  hasTwoLegs: {
    type: Boolean,
    required: true,
  },
});

const participantsValue = computed({
  get: () => props.participants,
  set: (value) => emit('update:participants', value),
});
const hasTwoLegsValue = computed({
  get: () => props.hasTwoLegs,
  set: (value) => emit('update:hasTwoLegs', value),
});
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
