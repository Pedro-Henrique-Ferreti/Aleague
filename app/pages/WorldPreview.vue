<template>
  <NuxtLayout>
    <div class="flex items-center justify-between gap-1 mb-2 p-1 rounded-box bg-base-200 text-sm">
      <span class="font-medium">Prévia de design — estado da temporada</span>
      <div class="join">
        <button
          v-for="option in OPTIONS"
          :key="option.state"
          class="btn btn-sm join-item"
          :class="{ 'btn-primary': state === option.state }"
          @click="state = option.state"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
    <WorldPage :world="world" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const OPTIONS = [
  { state: SeasonState.SETUP, label: 'Configuração' },
  { state: SeasonState.IN_PLAY, label: 'Em andamento' },
  { state: SeasonState.FINISHED, label: 'Finalizada' },
];

const route = useRoute();
const state = ref<SeasonState>(OPTIONS.find(o => o.state === route.query.state)?.state ?? SeasonState.IN_PLAY);

const badge = (id: number) => `https://img.sofascore.com/api/v1/team/${id}/image`;
const CLUBS = {
  palmeiras: { name: 'Palmeiras', badge: badge(1963) },
  flamengo: { name: 'Flamengo', badge: badge(5981) },
  botafogo: { name: 'Botafogo', badge: badge(1958) },
  atleticoMg: { name: 'Atlético-MG', badge: badge(1977) },
  sport: { name: 'Sport', badge: badge(1959) },
  goias: { name: 'Goiás', badge: badge(1960) },
  guarani: { name: 'Guarani', badge: badge(1972) },
  gama: { name: 'Gama', badge: badge(1978) },
  fluminense: { name: 'Fluminense', badge: badge(1961) },
  corinthians: { name: 'Corinthians', badge: badge(1957) },
};

function tournament(
  id: string,
  name: string,
  teamsCount: number,
  total: number,
  lastChampion: WorldChampion,
  champion: WorldChampion,
  progress: number,
): WorldTournamentSummary {
  const s = state.value;
  const finished = s === SeasonState.FINISHED;
  return {
    id,
    name,
    teamsCount,
    isReady: s !== SeasonState.SETUP || progress > 0.4,
    matches: s === SeasonState.SETUP ? null : { total, played: finished ? total : Math.round(total * progress) },
    lastChampion,
    champion: finished ? champion : undefined,
  };
}

const world = computed<WorldOverview>(() => ({
  name: 'Mundo Brasileiro',
  description: 'Pirâmide nacional com quatro divisões, Copa do Brasil e as principais competições sul-americanas, simuladas temporada após temporada.',
  createdAt: '2026-03-14T12:00:00.000Z' as Timestamp,
  seasonLabelStyle: 'ano único',
  seasonsPlayed: 3,
  teamsCount: 96,
  season: {
    label: '2029',
    nextLabel: '2030',
    state: state.value,
    blockingIssues: state.value === SeasonState.FINISHED && route.query.issues ? 2 : 0,
  },
  competitions: [
    {
      id: 'brasileiro',
      type: 'league',
      name: 'Campeonato Brasileiro',
      scope: 'domestic',
      tournaments: [
        tournament('a', 'Série A', 20, 380, CLUBS.palmeiras, CLUBS.flamengo, 0.62),
        tournament('b', 'Série B', 20, 380, CLUBS.sport, CLUBS.goias, 0.62),
        tournament('c', 'Série C', 20, 190, CLUBS.guarani, CLUBS.guarani, 0.5),
        tournament('d', 'Série D', 64, 192, CLUBS.gama, CLUBS.gama, 0.3),
      ],
    },
    {
      id: 'paulista',
      type: 'league',
      name: 'Campeonato Paulista',
      scope: 'regional',
      tournaments: [
        tournament('p1', 'Série A1', 16, 120, CLUBS.corinthians, CLUBS.palmeiras, 0.8),
        tournament('p2', 'Série A2', 16, 120, CLUBS.guarani, CLUBS.gama, 0.8),
      ],
    },
    {
      id: 'copa-do-brasil',
      type: 'cup',
      name: 'Copa do Brasil',
      scope: 'domestic',
      tournaments: [tournament('cb', 'Copa do Brasil', 64, 127, CLUBS.flamengo, CLUBS.atleticoMg, 0.45)],
    },
    {
      id: 'libertadores',
      type: 'cup',
      name: 'Copa Libertadores',
      scope: 'continental',
      tournaments: [tournament('lib', 'Copa Libertadores', 32, 125, CLUBS.botafogo, CLUBS.fluminense, 0.7)],
    },
    {
      id: 'sulamericana',
      type: 'cup',
      name: 'Copa Sul-Americana',
      scope: 'continental',
      tournaments: [tournament('sul', 'Copa Sul-Americana', 32, 125, CLUBS.atleticoMg, CLUBS.corinthians, 0.7)],
    },
  ],
}));
</script>
