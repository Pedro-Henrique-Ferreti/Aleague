<template>
  <AppLargeField
    class="leagues-search-bar"
    placeholder="Pesquise por um campeonato aqui"
    v-model.trim="searchBarValue"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useLeaguesStore } from '@/stores/leaguesStore';
import AppLargeField from './AppLargeField.vue';

const { searchBarValue } = storeToRefs(useLeaguesStore());
</script>

<style lang="scss" scoped>
.leagues-search-bar {
  margin-bottom: 2rem;
  @include for-large-tablet-landscape-up {
    max-width: 50%;
  }
}
</style>
