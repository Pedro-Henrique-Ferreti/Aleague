<template>
  <div class="card card-border relative">
    <div class="card-body p-1 pt-1.5 grid gap-0.5">
      <div class="badge badge-secondary badge-soft absolute top-0 left-1/2 -translate-1/2">
        Rodada {{ matchweek.week }}
      </div>
      <MatchCard
        v-for="match in matchweek.matches"
        :key="match.id"
        :match="match"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  matchweek: Matchweek;
}>();
</script>
