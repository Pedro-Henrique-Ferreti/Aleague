<template>
  <div class="empty-state">
    <span class="h2">
      Nenhuma equipe ainda
    </span>
    <p class="empty-state__text">
      <slot />
    </p>
    <div
      v-if="$slots.controls"
      class="empty-state__controls"
    >
      <slot name="controls" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty-state {
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
