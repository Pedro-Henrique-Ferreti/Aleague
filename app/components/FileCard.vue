<template>
  <BaseButton
    class="card card-border p-1 hover:shadow-sm hover:border-base-300 transition-colors duration-200 ease-in-out"
    :to="{ name: 'editor', params: { fileId: file.id } }"
  >
    <div class="flex justify-between">
      <img
        v-if="isTournament"
        class="w-auto h-2 mr-auto"
        alt="Logo do campeonato"
        :src="(file as TournamentFile).data.icon"
      >
      <IconFolder
        v-else
        class="w-auto h-2 mr-auto"
      />
      <span
        class="badge badge-sm badge-soft"
        :class="[isTournament ? 'badge-primary' : 'badge-secondary']"
      >
        {{ isTournament ? 'Campeonato' : 'Coleção' }}
      </span>
    </div>
    <h2 class="mt-1 font-medium text-base">{{ file.data.name }}</h2>
    <span class="text-base-content/70 text-xs">Criado em: {{ formatDate(file.createdAt, 'dd/MM/yyyy') }}</span>
  </BaseButton>
</template>

<script lang="ts" setup>
import IconFolder from '@/assets/icons/Folder.svg';
import { isTournamentFile } from '~/helpers/file';

const props = defineProps<{
  file: SourceFile;
}>();

const isTournament = computed(() => isTournamentFile(props.file));
</script>
