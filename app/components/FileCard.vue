<template>
  <BaseButton
    class="card card-border p-1 hover:shadow-sm hover:border-base-300 transition-colors duration-200 ease-in-out"
    :to="{ name: 'editor', params: { fileId: file.id } }"
  >
    <div class="flex justify-between">
      <component
        :is="isTournament ? IconFile : IconFolder"
        class="w-auto h-1.75 mr-auto"
      />
      <span
        class="badge badge-sm badge-soft"
        :class="[isTournament ? 'badge-primary' : 'badge-secondary']"
      >
        {{ isTournament ? 'Campeonato' : 'Coleção' }}
      </span>
    </div>
    <h2 class="mt-1 font-medium text-base">{{ file.data.name }}</h2>
    <span class="text-base-content/70 text-xs">Criado em: {{ formatDate(file.data.createdAt, 'dd/MM/yyyy') }}</span>
  </BaseButton>
</template>

<script lang="ts" setup>
import IconFile from '@/assets/icons/File.svg';
import IconFolder from '@/assets/icons/Folder.svg';
import { isTournamentFile } from '~/helpers/file';

const props = defineProps<{
  file: SourceFile;
}>();

const isTournament = computed(() => isTournamentFile(props.file));
</script>
