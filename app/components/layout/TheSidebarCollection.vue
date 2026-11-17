<template>
  <TheSidebarMenuItem
    class="gap-0.25"
    :to="{ name: 'editor', params: { fileId: file.id } }"
    :label="file.data.name"
    :icon="isActive ? IconFolderOpen : IconFolder"
  >
    <ul
      v-if="isActive"
      class="gap-0.25"
    >
      <TheSidebarFileItem
        v-for="tournament in file.data.tournaments"
        :key="tournament.id"
        :file-id="file.id"
        :label="tournament.name"
        :tournament-id="tournament.id"
      />
    </ul>
  </TheSidebarMenuItem>
</template>

<script lang="ts" setup>
import { IconFolder, IconFolderOpen } from '@tabler/icons-vue';

const props = defineProps<{ file: CollectionFile }>();

const route = useRoute();
const fileStore = useFileStore();

const isActive = computed(() => {
  return route.name === 'editor' && props.file.id === fileStore.activeFile?.id;
});
</script>
