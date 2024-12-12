<template>
  <div class="form">
    <p>
      Para um campeonato eliminatório, você deve escolher o número de
      rodadas. Com base nisso, o sistema mostrará a quantidade de equipes participantes.
    </p>
    <div class="form__counter-wrapper">
      <AppCounter
        v-model="roundsValue"
        label="Número de rodadas"
        :min="PLAYOFFS_MIN_NUMBER_OF_ROUNDS"
        :max="PLAYOFFS_MAX_NUMBER_OF_ROUNDS"
      />
      <AppCounter
        readonly
        label="Equipes participantes"
        :model-value="2 ** roundsValue"
      />
    </div>
    <div class="form__toggles">
      <AppToggle
        v-model="twoLeggedRoundsValue"
        id="playoffs--two-legged-rounds"
        text="Partidas de ida e volta"
      />
      <AppToggle
        v-model="twoLeggedFinalValue"
        id="playoffs--two-legged-final"
        text="Final em duas partidas"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  PLAYOFFS_MIN_NUMBER_OF_ROUNDS, PLAYOFFS_MAX_NUMBER_OF_ROUNDS,
} from '@/constants/tournament';
import AppCounter from './AppCounter.vue';
import AppToggle from './AppToggle.vue';

const emit = defineEmits(['update:rounds', 'update:twoLeggedRounds', 'update:twoLeggedFinal']);
const props = defineProps({
  rounds: {
    type: Number,
    required: true,
  },
  twoLeggedRounds: {
    type: Boolean,
    required: true,
  },
  twoLeggedFinal: {
    type: Boolean,
    required: true,
  },
});

const roundsValue = computed({
  get: () => props.rounds,
  set: (value) => emit('update:rounds', value),
});
const twoLeggedRoundsValue = computed({
  get: () => props.twoLeggedRounds,
  set: (value) => emit('update:twoLeggedRounds', value),
});
const twoLeggedFinalValue = computed({
  get: () => props.twoLeggedFinal,
  set: (value) => emit('update:twoLeggedFinal', value),
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
