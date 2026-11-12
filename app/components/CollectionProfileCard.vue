<template>
  <div class="flex items-center gap-1.5">
    <IconFolder class="w-auto h-5" />
    <div>
      <h1 class="text-2xl font-medium mb-0.25">{{ collectionStore.activeCollection?.data.name }}</h1>
      <AppBadge
        class="badge-soft badge-secondary badge-sm"
        :icon="IconClock"
        :text="formatDate(collectionStore.activeCollection?.createdAt, 'd MMM yyyy')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconClock } from '@tabler/icons-vue';
import IconFolder from '@/assets/icons/Folder.svg';

const collectionStore = useCollectionStore();
</script>
