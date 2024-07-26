<template>
  <div class="tournament-format">
    <span class="tournament-format__label">
      Formato do campeonato
    </span>
    <div class="tournament-format__cards">
      <AppSelectionCard
        v-model="formatValue"
        id="tournament-format--1"
        :value="TournamentFormat.ALL_PLAY_ALL"
        text="Pontos corridos"
        :icon="IconMedal"
      />
      <AppSelectionCard
        v-model="formatValue"
        id="tournament-format--2"
        :value="TournamentFormat.PLAYOFFS"
        text="Eliminatórias"
        :icon="IconPlayoff"
      />
      <AppSelectionCard
        v-model="formatValue"
        id="tournament-format--3"
        :value="TournamentFormat.CUSTOM"
        text="Fases livres"
        :icon="IconTrophy"
      />
      <p v-if="formatValue === TournamentFormat.ALL_PLAY_ALL">
        Cada um dos competidores enfrenta todos os demais. Ao final, aquele que obtiver mais pontos
        é o campeão. Pode ser disputado em turno único ou em dois turnos (turno e returno).
      </p>
      <p v-else-if="formatValue === TournamentFormat.PLAYOFFS">
        Dividido em duas fases. Na primeira fase, as equipes são dividias em grupos, onde podem
        se enfrentar em um turno ou dois turnos. Um determinado número de equipes é promovido
        para a próxima fase, que é disputada em formato eliminatório.
      </p>
      <p v-else-if="formatValue === TournamentFormat.CUSTOM">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { TournamentFormat } from '@/constants/tournament';
import IconMedal from '@/assets/icons/IconMedal.svg';
import IconPlayoff from '@/assets/icons/IconPlayoff.svg';
import IconTrophy from '@/assets/icons/IconTrophy.svg';
import AppSelectionCard from './AppSelectionCard.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const formatValue = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
.tournament-format {
  margin-top: 1.5rem;
  &__label {
    display: block;
    margin-bottom: 0.5rem;
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
