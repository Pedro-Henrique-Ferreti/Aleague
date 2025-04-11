<template>
  <section class="groups">
    <header class="groups__header">
      <h2 class="groups__title">
        Grupos
      </h2>
      <AppButton
        :icon-left="IconPlus"
      >
        Novo Grupo
      </AppButton>
    </header>
    <div class="groups__list">
      list
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TournamentPreview } from '@/types/Tournament';
import IconPlus from '@/assets/icons/Plus.svg';
import AppButton from './AppButton.vue';

defineProps<{
  tournaments: TournamentPreview[];
}>();

</script>

<style lang="scss" scoped>
.groups {
  margin-top: 2.5rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.75rem;
  }
  &__title {
    color: $color--text-strong;
    font-size: 1.25rem;
    font-weight: $font-weight--medium;
  }
  &__list {
    display: grid;
    gap: 0.75rem;
  }
}
</style>
