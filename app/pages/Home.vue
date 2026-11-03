<template>
  <NuxtLayout>
    <header class="flex items-center justify-between mb-1.5">
      <h1 class="text-2xl font-semibold">Arquivos</h1>
      <div class="flex gap-0.75">
        <ImportFileButton class="btn-sm btn-soft" />
        <CreateFileModal class="btn-primary btn-sm" />
      </div>
    </header>
    <div class="flex mb-0.75 justify-between">
      <span>{{ filesCount }}</span>
      <AppInput
        v-model.trim="searchTerm"
        size="sm"
        placeholder="Buscar arquivos"
        :icon="IconSearch"
      />
    </div>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-1">
      <li
        v-for="file in filteredFiles"
        :key="file.id"
      >
        <FileCard :file="file" />
      </li>
    </ul>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { IconSearch } from '@tabler/icons-vue';

const fileStore = useFileStore();

const searchTerm = ref('');

const filteredFiles = computed(() => {
  return Object.values(fileStore.files).filter(file => matchesSearch(searchTerm.value, file.data.name));
});

const filesCount = computed(() => {
  const { length } = filteredFiles.value;
  return `${length} ${length === 1 ? 'arquivo' : 'arquivos'}`;
});
</script>
