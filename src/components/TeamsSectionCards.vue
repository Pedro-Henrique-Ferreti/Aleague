<template>
  <div class="teams-card-grid">
    <TeamsCard
      v-for="n in 10"
      :key="n"
      name="Paulicéia"
      :is-favorite="n % 3 === 0"
    />
  </div>
</template>

<script lang="ts" setup>
import TeamsCard from './TeamsCard.vue';
</script>

<style lang="scss" scoped>
.teams-card-grid {
  display: grid;
  gap: 1rem;
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
  }
  @include for-desktop-up {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
