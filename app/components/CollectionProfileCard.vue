<template>
  <div class="flex items-center gap-1.5">
    <IconFolder class="w-auto h-6" />
    <div>
      <h1 class="text-3xl font-medium mb-0.5">{{ collectionStore.activeCollection?.name }}</h1>
      <div class="badge badge-ghost">
        <IconCalendarPlus class="size-[1em]" />
        {{ formatDate(collectionStore.activeCollection?.createdAt, 'd MMM yyyy') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCalendarPlus } from '@tabler/icons-vue';
import IconFolder from '@/assets/icons/Folder.svg';

const collectionStore = useCollectionStore();
</script>
