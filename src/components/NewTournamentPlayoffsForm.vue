<template>
  <div class="form">
    <p>
      Para um campeonato eliminatório, você deve escolher o número de
      rodadas. Com base nisso, o sistema mostrará a quantidade de equipes participantes.
    </p>
    <div class="form__counter-wrapper">
      <AppCounter
        v-model="rounds"
        label="Número de rodadas"
        :min="PLAYOFFS_MIN_NUMBER_OF_ROUNDS"
        :max="PLAYOFFS_MAX_NUMBER_OF_ROUNDS"
      />
      <AppCounter
        readonly
        label="Equipes participantes"
        :model-value="2 ** rounds"
      />
    </div>
    <div class="form__toggles">
      <AppToggle
        v-model="isDoubleLegged"
        text="Partidas de ida e volta"
      />
      <AppToggle
        v-model="finalRoundIsDoubleLegged"
        text="Final em duas partidas"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PLAYOFFS_MIN_NUMBER_OF_ROUNDS, PLAYOFFS_MAX_NUMBER_OF_ROUNDS,
} from '@/constants/tournament';
import AppCounter from './AppCounter.vue';
import AppToggle from './AppToggle.vue';

const rounds = defineModel('rounds', { type: Number, required: true });
const isDoubleLegged = defineModel('isDoubleLegged', { type: Boolean, required: true });
const finalRoundIsDoubleLegged = defineModel('finalRoundIsDoubleLegged', {
  type: Boolean,
  required: true,
});
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
