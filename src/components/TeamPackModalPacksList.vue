<template>
  <p class="packs-list__description">
    Pacotes de equipe contém equipes famosas de várias ligas ao redor do mundo. Escolha um dos pacotes abaixo para visualizar a lista de equipes que serão criadas ao aplicar o pacote.
  </p>
  <Transition name="fade">
    <LoadingIndicator v-if="showLoadingIndicator" />
    <div
      v-else
      class="packs-list-grid"
    >
      <div
        v-for="pack in teamsStore.teamPacks"
        :key="pack.id"
      >
        {{ pack.name }}
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useTeamsStore } from '@/stores/teamsStore';
import LoadingIndicator from './LoadingIndicator.vue';

defineProps({
  showLoadingIndicator: {
    type: Boolean,
    required: true,
  },
});

const teamsStore = useTeamsStore();
</script>

<style lang="scss" scoped>
.packs-list__description {
  margin-bottom: 2rem;
}
</style>
