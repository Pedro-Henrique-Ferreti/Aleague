<template>
  <AppLargeField
    class="leagues-search-bar"
    type="search"
    placeholder="Pesquise por um campeonato aqui"
    v-model.trim="searchBarValue"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCompetitionStore } from '@/stores/competitionStore';
import AppLargeField from './AppLargeField.vue';

const { searchBarValue } = storeToRefs(useCompetitionStore());
</script>

<style lang="scss" scoped>
.leagues-search-bar {
  margin-bottom: 2rem;
  @include for-large-tablet-landscape-up {
    max-width: 50%;
  }
}
</style>
