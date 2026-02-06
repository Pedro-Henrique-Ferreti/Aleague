<template>
  <li class="gap-0.25">
    <BaseButton
      class="group/collection"
      @click="$emit('edit')"
    >
      <IconFolderOpen class="h-1 w-1" />
      {{ collection.name }}
      <IconEdit class="h-1 w-1 opacity-0 group-hover/collection:opacity-100" />
    </BaseButton>
    <ul class="grid gap-0.25">
      <TheSidebarFileItem
        v-for="tournament in tournaments"
        :key="tournament.id"
        :tournament="tournament"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { IconEdit, IconFolderOpen } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

defineEmits<{ 'edit': [] }>();
const props = defineProps<{ collection: Collection }>();

const tournaments = computed(() => tournamentStore.tournaments.filter((t) => t.collectionId === props.collection.id));
</script>
