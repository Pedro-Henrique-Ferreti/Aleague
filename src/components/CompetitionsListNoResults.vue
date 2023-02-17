<template>
  <NoContent
    title="Nenhum campeonato encontrado"
    action-button-text="Criar campeonato"
    :action-button-path="{ name: 'create-league' }"
  >
    <p>Nenhum resultado foi encontrado para a sua busca.</p>
  </NoContent>
</template>

<script lang="ts" setup>
import NoContent from './NoContent.vue';
</script>
