<template>
  <main class="leagues container-medium">
    <router-view>
      <CreateLeagueFormat />
    </router-view>
  </main>
</template>

<script lang="ts" setup>
import CreateLeagueFormat from '@/components/CreateLeagueFormat.vue';
</script>
