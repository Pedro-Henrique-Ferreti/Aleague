<template>
  <div class="teams-card-grid">
    <TeamsCard
      v-for="team in teams"
      :key="team.id"
      :name="team.name"
      :is-favorite="team.isFavorite"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTeamsStore } from '@/stores/teamsStore';
import TeamsCard from './TeamsCard.vue';

const teamsStore = useTeamsStore();
const { teams } = storeToRefs(teamsStore);

onMounted(() => {
  teamsStore.getTeams();
});
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
