<template>
  <TransitionFade>
    <LoadingIndicator v-if="isLoading" />
    <ErrorState
      v-else-if="errorMessage"
      :message="errorMessage"
      @reload="getTournament"
    />
    <div
      v-else-if="tournament"
      class="tournament | container-small"
    >
      <PageHeader
        title="Editar campeonato"
        :breadcrumb-items="BREADCRUMB_ITEMS"
      />
      <EditTournamentSettings
        v-if="tournament.type === TournamentFormat.PLAYOFFS"
        :tournament="tournament"
      />
      <div
        v-else
        class="tournament__content"
      >
        <AppTabPanel
          direction="vertical"
          :items="Object.values(EditTournamentTab)"
        >
          <template #default="{ activeTabId }">
            <EditTournamentSettings
              v-if="activeTabId === EditTournamentTab.SETTINGS.id"
              :tournament="tournament"
            />
            <EditTournamentSubtitles
              v-else-if="activeTabId === EditTournamentTab.SUBTITLES.id"
              :tournament="tournament"
            />
            <EditTournamentFixtures
              v-else-if="activeTabId === EditTournamentTab.FIXTURES.id"
              :tournament="tournament"
            />
          </template>
        </AppTabPanel>
      </div>
    </div>
  </TransitionFade>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { Tournament } from '@/types/Tournament';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { EditTournamentTab, TournamentFormat } from '@/constants/tournament';
import api from '@/api';
import AppTabPanel from '@/components/AppTabPanel.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import PageHeader from '@/components/PageHeader.vue';
import EditTournamentSettings from '@/components/EditTournamentSettings.vue';
import EditTournamentSubtitles from '@/components/EditTournamentSubtitles.vue';
import EditTournamentFixtures from '@/components/EditTournamentFixtures.vue';

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

getTournament();

// Breadcrumb items
const BREADCRUMB_ITEMS = computed<Breadcrumb[]>(() => ([
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  {
    title: tournament.value?.name || '',
    to: { name: 'show-tournament', params: { id: tournament.value?.id } },
  },
  'Editar',
]));
</script>

<style lang="scss" scoped>
.tournament {
  &__content {
    @include for-large-tablet-portrait-up {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: 1fr 5fr;
      align-items: flex-start;
    }
    >:nth-child(2) {
      @include for-large-tablet-portrait-down {
        margin-top: 1.5rem;
      }
    }
  }
}
</style>
