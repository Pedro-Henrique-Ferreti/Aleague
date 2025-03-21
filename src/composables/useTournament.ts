import type { Breadcrumb } from '@/types/Breadcrumb';
import type { Tournament } from '@/types/Tournament';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api';

export function useTournament(payload: { currentPageName: string; }) {
  const route = useRoute();

  const tournament = ref<Tournament | null>(null);

  // Get tournament
  const isLoading = ref(true);
  const errorMessage = ref('');

  async function getTournament() {
    isLoading.value = true;
    errorMessage.value = '';
    tournament.value = null;

    try {
      const { data } = await api.tournamentService.getTournamentById(route.params.id as string);
      tournament.value = data;
    } catch (error: any) {
      errorMessage.value = 'Algo deu errado e não foi possível carregar o campeonato.';
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(getTournament);

  // Breadcrumb items
  const breadcrumbItems = computed<Breadcrumb[]>(() => ([
    { title: 'Campeonatos', to: { name: 'tournaments' } },
    {
      title: tournament.value?.name || '',
      to: { name: 'show-tournament', params: { id: tournament.value?.id } },
    },
    payload.currentPageName,
  ]));

  return {
    isLoading,
    errorMessage,
    tournament,
    breadcrumbItems,
    getTournament,
  };
}
