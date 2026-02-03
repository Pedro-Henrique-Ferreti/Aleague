<template>
  <NuxtLayout name="default">
    <div class="flex flex-col items-center pt-3 text-center max-w-30 mx-auto">
      <h1 class="text-3xl font-semibold mb-0.5">Histórico e Estatísticas</h1>
      <p>Importe um ou mais campeonatos para ver o histórico de vencedores e partidas.</p>
      <div class="flex mt-2 w-full items-center justify-center">
        <OpenFileButton class="w-full max-w-12" />
      </div>
    </div>
  </NuxtLayout>
</template>


<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
