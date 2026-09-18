<template>
  <li class="gap-0.25">
    <BaseButton
      :class="{ 'menu-active': !tournamentStore.activeTournament && isActive }"
      @click="collectionStore.setActiveCollection(collection.id)"
    >
      <component
        :is="isActive ? IconFolderOpen : IconFolder"
        class="h-1 w-1"
      />
      {{ collection.name }}
    </BaseButton>
    <ul
      v-if="isActive"
      class="grid gap-0.25"
    >
      <TheSidebarFileItem
        v-for="tournament in tournaments"
        :key="tournament.id"
        :tournament="tournament"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { IconFolder, IconFolderOpen } from '@tabler/icons-vue';

const props = defineProps<{ collection: Collection }>();

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

const tournaments = computed(() => tournamentStore.tournamentList.filter(t => t.collectionId === props.collection.id));
const isActive = computed(() => props.collection.id === collectionStore.activeCollection?.id);
</script>
