<template>
  <header class="competition-header">
    <div class="competition-header__content">
      <div class="competition-header__icon-wrapper">
        <img
          class="competition-header__icon"
          alt="Competition icon"
          :src="competitionIcon"
        />
      </div>
      <h1 class="competition-header__title">
        {{ competitionName }}
      </h1>
    </div>
    <span class="competition-header__status">
      Status:
      <AppChip
        :type="competitionIsCompleted ? 'success' : 'info'"
        :text="competitionIsCompleted ? 'Campeonato concluído' : 'Campeonato em andamento'"
      />
    </span>
  </header>
</template>

<script lang="ts" setup>
import AppChip from './AppChip.vue';

defineProps({
  competitionName: {
    type: String,
    default: '',
  },
  competitionIcon: {
    type: String,
    default: '',
  },
  competitionIsCompleted: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.competition-header {
  --icon-size: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  &__content {
    display: flex;
    gap: 1rem;
    @include for-large-tablet-portrait-up {
      align-items: center;
      gap: 1.25rem;
    }
  }
  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--icon-size);
    height: var(--icon-size);
    padding: 0.375rem;
    border: 1px solid $color--light-gray-2;
    border-radius: 0.75em;
    box-shadow: $shadow--extra-small;
  }
  &__icon {
    width: 100%;
    height: auto;
  }
  &__title {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 1.25rem;
    font-weight: $font-weight--semibold;
    min-height: var(--icon-size);
    @include for-large-tablet-portrait-up {
      min-height: unset;
      font-size: 1.875rem;
    }
  }
  &__status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  @include for-large-tablet-portrait-up {
    --icon-size: 4.25rem;
    margin-bottom: 2rem;
  }
  @include for-large-tablet-landscape-up {
    flex-direction: row;
    gap: 1.25rem;
  }
}
</style>
