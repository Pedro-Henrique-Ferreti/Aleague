<template>
  <li class="gap-0.25">
    <BaseButton
      :class="{ 'menu-active': isActive }"
      :to="{ name: 'editor', params: { fileId: file.id } }"
    >
      <component
        :is="isActive ? IconFolderOpen : IconFolder"
        class="h-1 w-1"
      />
      {{ file.data.name }}
    </BaseButton>
    <ul
      v-if="isActive"
      class="grid gap-0.25"
    >
      <TheSidebarFileItem
        v-for="tournament in file.data.tournaments"
        :key="tournament.id"
        :file-id="file.id"
        :label="tournament.name"
        :tournament-id="tournament.id"
      />
    </ul>
  </li>
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
