<template>
  <div class="team-packs-list">
    <p class="team-packs-list__description">
      Pacotes de equipe contém equipes famosas de várias ligas ao redor do mundo. Escolha um dos pacotes abaixo para visualizar a lista de equipes que serão criadas ao aplicar o pacote.
    </p>
    <AppTransition name="fade">
      <LoadingIndicator v-if="showLoadingIndicator" />
      <div
        v-else
        class="team-packs-list__grid"
      >
        <TeamPackCard
          v-for="teamPack in teamsStore.teamPacks"
          :key="teamPack.id"
          :name="teamPack.name"
          :icon="teamPack.icon"
          :applied="teamPack.applied"
          :teams-count="teamPack.teamsCount"
          @click="$emit('get-team-pack-details', teamPack.id)"
        />
      </div>
    </AppTransition>
  </div>
</template>

<script lang="ts" setup>
import { useTeamsStore } from '@/stores/teamsStore';
import AppTransition from './AppTransition.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import TeamPackCard from './TeamPackCard.vue';

defineEmits(['get-team-pack-details']);
defineProps({
  showLoadingIndicator: {
    type: Boolean,
    required: true,
  },
});

const teamsStore = useTeamsStore();
</script>

<style lang="scss" scoped>
.team-packs-list {
  &__description {
    margin-bottom: 2rem;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem 1rem;
  }
}
</style>
