<template>
  <nav class="flex gap-1">
    <AppButton
      class="btn-ghost bg-white hover:border-gray-300 hover:bg-white"
      label="Campeonatos"
      :class="[$route.name === 'home' ? 'text-black! border-gray-300' : 'border-transparent']"
      :to="{ name: 'home' }"
      :icon-left="IconSitemap"
    />
    <AppButton
      class="btn-ghost bg-white hover:border-gray-300 hover:bg-white"
      label="Estatísticas"
      :class="[$route.name === 'analytics' ? 'text-black! border-gray-300' : 'border-transparent']"
      :to="{ name: 'analytics' }"
      :icon-left="IconDatabase"
    />
  </nav>
</template>

<script setup lang="ts">
import { IconDatabase, IconSitemap } from '@tabler/icons-vue';
</script>
