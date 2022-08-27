<template>
  <AppLargeField
    class="teams-search-bar"
    placeholder="Pesquise por uma equipe aqui"
  />
</template>

<script lang="ts" setup>
import AppLargeField from '@/components/AppLargeField.vue';
</script>

<style lang="scss" scoped>
.teams-search-bar {
  margin-bottom: 2rem;
  @include for-large-tablet-landscape-up {
    max-width: 50%;
  }
}
</style>
