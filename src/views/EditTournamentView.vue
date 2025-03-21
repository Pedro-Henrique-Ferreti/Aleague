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
        :breadcrumb-items="breadcrumbItems"
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
import { useTournament } from '@/composables/useTournament';
import { EditTournamentTab, TournamentFormat } from '@/constants/tournament';
import AppTabPanel from '@/components/AppTabPanel.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import PageHeader from '@/components/PageHeader.vue';
import EditTournamentSettings from '@/components/EditTournamentSettings.vue';
import EditTournamentSubtitles from '@/components/EditTournamentSubtitles.vue';
import EditTournamentFixtures from '@/components/EditTournamentFixtures.vue';

const {
  tournament, isLoading, errorMessage, getTournament, breadcrumbItems,
} = useTournament({ currentPageName: 'Editar' });
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
