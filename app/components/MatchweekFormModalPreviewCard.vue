<template>
  <div class="card card-border relative">
    <div class="card-body p-1 pt-1.5 grid gap-0.5">
      <div
        class="badge badge-soft absolute top-0 left-1/2 -translate-1/2"
        :class="[roundRobinNumber % 2 ? 'badge-secondary' : 'badge-accent']"
      >
        Rodada {{ matchweek.week }}
        <span
          v-if="store.form.roundRobins > 1"
          v-text="`(Turno ${roundRobinNumber})`"
          class="text-xs"
        />
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
const props = defineProps<{
  matchweek: Matchweek;
}>();

const store = useMatchweekFormStore();

const roundRobinNumber = computed(() => Math.ceil(props.matchweek.week / store.form.weeksToCreate));
</script>
