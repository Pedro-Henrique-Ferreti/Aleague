<template>
  <NoContent
    title="Nenhum campeonato cadastrado"
    action-button-text="Criar campeonato"
    :action-button-path="{ name: 'create-competition' }"
  >
    <p>Você ainda não criou nenhuma campeonato. Que tal fazer isso agora?</p>
  </NoContent>
</template>

<script lang="ts" setup>
import NoContent from './NoContent.vue';
</script>
