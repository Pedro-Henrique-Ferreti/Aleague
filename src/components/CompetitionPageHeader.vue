<template>
  <header class="competition-page-header">
    <div class="competition-page-header__image-wrapper">
      <img
        class="competition-page-header__image"
        alt="Competition icon"
        :src="competitionIcon"
      />
    </div>
    <h1 class="competition-page-header__heading">
      {{ competitionName }}
    </h1>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  competitionName: {
    type: String,
    default: '',
  },
  competitionIcon: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.competition-page-header {
  --image-size: 3.5rem;
  --font-size: 1.25rem;

  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  &__image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--image-size);
    height: var(--image-size);
    padding: 0.375rem;
    margin-right: 1.25rem;
    border: 1px solid $color--light-gray-2;
    border-radius: 0.75em;
    box-shadow: $shadow--extra-small;
  }
  &__image {
    width: 100%;
    height: auto;
  }
  &__heading {
    flex: 1;
    font-size: var(--font-size);
    font-weight: $font-weight--semibold;
  }
  @include for-large-tablet-portrait-up {
    --image-size: 4.25rem;
    --font-size: 1.875rem;

    margin-bottom: 2rem;
  }
}
</style>
