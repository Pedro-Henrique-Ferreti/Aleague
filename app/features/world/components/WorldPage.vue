<template>
  <WorldProfileCard :world="world" />
  <WorldStats :world="world" />
  <WorldSeasonCard
    :season="world.season"
    :competitions="world.competitions"
  />
  <section>
    <h2 class="font-medium text-xl mb-1">Ligas</h2>
    <ul class="grid grid-cols-1 desktop:grid-cols-2 gap-1 mb-3">
      <li
        v-for="competition in leagues"
        :key="competition.id"
        class="grid"
      >
        <WorldLeagueCard
          :competition="competition"
          :season-state="world.season.state"
        />
      </li>
    </ul>
    <h2 class="font-medium text-xl mb-1">Copas</h2>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-1">
      <li
        v-for="competition in cups"
        :key="competition.id"
        class="grid"
      >
        <WorldCupCard
          :competition="competition"
          :season-state="world.season.state"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  world: WorldOverview;
}>();

const leagues = computed(() => props.world.competitions.filter(c => c.type === 'league'));
const cups = computed(() => props.world.competitions.filter(c => c.type === 'cup'));
</script>
