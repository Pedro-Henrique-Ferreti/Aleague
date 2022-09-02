<template>
  <AppLargeField
    class="teams-search-bar"
    placeholder="Pesquise por uma equipe aqui"
    v-model="searchBarValue"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useTeamsStore } from '@/stores/teamsStore';
import AppLargeField from '@/components/AppLargeField.vue';

const teamsStore = useTeamsStore();
const { searchBarValue } = storeToRefs(teamsStore);
</script>

<style lang="scss" scoped>
.teams-search-bar {
  margin-bottom: 2rem;
  @include for-large-tablet-landscape-up {
    max-width: 50%;
  }
}
</style>
