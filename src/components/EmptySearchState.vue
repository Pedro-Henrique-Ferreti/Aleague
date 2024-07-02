<template>
  <div class="empty-search-state">
    <SearchState />
    <p class="empty-search-state__text">
      <slot>
        <template v-if="message">
          {{ message }}
        </template>
        <template v-else>
          Sua pesquisa não encontrou nenhum resultado. Por favor, tente novamente.
        </template>
      </slot>
    </p>
    <div class="empty-search-state__controls">
      <slot name="controls">
        <AppButton
          color="secondary"
          @click="$emit('clear-filters')"
        >
          Limpar filtros
        </AppButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchState from '@/assets/icons/SearchState.svg';
import AppButton from './AppButton.vue';

defineEmits(['clear-filters']);
defineProps({
  message: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.empty-search-state {
  width: fit-content;
  margin: 0 auto;
  text-align: center;
  &__text {
    max-width: 20rem;
    margin-top: 0.5rem;
  }
  &__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
}
</style>
