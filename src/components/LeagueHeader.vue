<template>
  <header class="league-header">
    <div class="league-header__image-wrapper">
      <img
        class="league-header__image"
        src="/images/leagues/league-format-icon.svg"
        alt="League icon"
      />
    </div>
    <h1 class="league-header__heading">
      {{ leagueName }}
    </h1>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  leagueName: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.league-header {
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
    margin-right: 1rem;
    border: 1px solid $color--light-gray-1;
    border-radius: 0.25rem;
  }
  &__image {
    width: 89%;
    height: auto;
  }
  &__heading {
    flex: 1;
    font-size: var(--font-size);
    font-weight: $font-weight--semibold;
  }
  @include for-large-tablet-portrait-up {
    --image-size: 4rem;
    --font-size: 1.875rem;

    margin-bottom: 2rem;
  }
}
</style>
