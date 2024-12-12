<template>
  <div class="form">
    <p>
      Para um campeonato eliminatório, você deve escolher o número de
      rodadas. Com base nisso, o sistema mostrará a quantidade de equipes participantes.
    </p>
    <div class="form__counter-wrapper">
      <AppCounter
        label="Número de rodadas"
        :min="PLAYOFFS_MIN_NUMBER_OF_ROUNDS"
        :max="PLAYOFFS_MAX_NUMBER_OF_ROUNDS"
        :model-value="rounds"
        @update:model-value="emit('update:rounds', $event)"
      />
      <AppCounter
        readonly
        label="Equipes participantes"
        :model-value="2 ** rounds"
      />
    </div>
    <div class="form__toggles">
      <AppToggle
        id="playoffs--two-legged-rounds"
        text="Partidas de ida e volta"
        :model-value="isDoubleLegged"
        @update:model-value="emit('update:is-double-legged', $event)"
      />
      <AppToggle
        id="playoffs--two-legged-final"
        text="Final em duas partidas"
        :model-value="finalRoundIsDoubleLegged"
        @update:model-value="emit('update:final-round-is-double-legged', $event)"
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

const emit = defineEmits([
  'update:rounds',
  'update:is-double-legged',
  'update:final-round-is-double-legged',
]);
defineProps({
  rounds: {
    type: Number,
    required: true,
  },
  isDoubleLegged: {
    type: Boolean,
    required: true,
  },
  finalRoundIsDoubleLegged: {
    type: Boolean,
    required: true,
  },
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
