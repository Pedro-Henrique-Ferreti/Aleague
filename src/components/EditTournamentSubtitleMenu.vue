<template>
  <AppPopupMenu
    confirm-button-text="Adicionar"
    :title="(!!subtitle) ? 'Editar legenda' : 'Nova legenda'"
  >
    <slot />
    <template #content>
      <div class="subtitle-form">
        <AppInput
          id="subtitle-form--name"
          label="Título"
        />
        <div>
          <span class="subtitle-form__label">
            Cor
          </span>
          <AppColorPicker
            v-model="form.color"
            id="subtitle-form--color"
            :color-options="STANDINGS_SUBTITLE_COLORS"
          />
        </div>
        <div>
          <span class="subtitle-form__label">
            Posição na tabela
          </span>
          <div class="subtitle-form__positions">
            <AppRadioInput
              v-for="n in 10"
              v-model="form.positions"
              class="subtitle-form__position"
              type="checkbox"
              size="small"
              :id="`subtitle-form--position-${n}`"
              :key="n"
              :value="n"
              :text="`${n}º`"
            />
          </div>
        </div>
      </div>
    </template>
  </AppPopupMenu>
</template>

<script lang="ts" setup>
import type { StandingsSubtitle } from '@/types/TournamentSubtitles';
import { ref, type PropType } from 'vue';
import { STANDINGS_SUBTITLE_COLORS } from '@/constants/tournament';
import AppPopupMenu from './AppPopupMenu.vue';
import AppInput from './AppInput.vue';
import AppColorPicker from './AppColorPicker.vue';
import AppRadioInput from './AppRadioInput.vue';

defineProps({
  subtitle: {
    type: Object as PropType<StandingsSubtitle>,
    default: undefined,
  },
});

const form = ref({
  color: '',
  positions: [],
});
</script>

<style lang="scss" scoped>
.subtitle-form {
  display: grid;
  gap: 1rem;
  &__label {
    display: block;
    margin-bottom: 0.5rem;
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__positions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem 0.125rem;
  }
  &__position {
    min-width: 2.875rem;
    justify-content: center;
  }
}
</style>
