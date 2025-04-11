<template>
  <main class="tournaments | container-large">
    <PageHeader
      title="Campeonatos"
      :chip-text="tournaments.length ? String(tournaments.length) : ''"
    >
      <AppButton
        :icon-left="IconPlus"
        :to="{ name: 'new-tournament' }"
      >
        Novo campeonato
      </AppButton>
    </PageHeader>
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
        @reload="getTournaments"
      />
      <EmptyState v-else-if="tournaments.length === 0">
        Parece que você ainda não criou nenhum campeonato.
        <template #controls>
          <AppButton
            color="secondary"
            :to="{ name: 'new-tournament' }"
            :icon-left="IconPlus"
          >
            Novo campeonato
          </AppButton>
        </template>
      </EmptyState>
      <div
        v-else
        class="tournaments__grid"
      >
        <TournamentPreviewCard
          v-for="tournament in nonGroupedTournaments"
          :key="tournament.id"
          :tournament="tournament"
        />
      </div>
    </TransitionFade>
    <TournamentGroups
      v-model:tournaments="tournaments"
      :non-grouped-tournaments="nonGroupedTournaments"
    />
  </main>
</template>

<script lang="ts" setup>
import type { TournamentPreview } from '@/types/Tournament';
import { computed, ref } from 'vue';
import api from '@/api';
import IconPlus from '@/assets/icons/Plus.svg';
import AppButton from '@/components/AppButton.vue';
import PageHeader from '@/components/PageHeader.vue';
import TransitionFade from '@/components/TransitionFade.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import ErrorState from '@/components/ErrorState.vue';
import EmptyState from '@/components/EmptyState.vue';
import TournamentPreviewCard from '@/components/TournamentPreviewCard.vue';
import TournamentGroups from '@/components/TournamentGroups.vue';

// Tournaments
const tournaments = ref<TournamentPreview[]>([]);

const nonGroupedTournaments = computed(() => (
  tournaments.value.filter((tournament) => !tournament.group)
));

// Get tournaments
const isLoading = ref(true);
const errorMessage = ref('');

async function getTournaments() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.tournamentService.getAllTournaments();
    tournaments.value = data;
  } catch (error: any) {
    errorMessage.value = 'Algo deu errado e não foi possível listar seus campeonatos.';
  } finally {
    isLoading.value = false;
  }
}

getTournaments();
</script>

<style lang="scss" scoped>
.tournaments {
  &__search-bar-radio {
    display: flex;
    gap: 0.75rem;
  }
  &__grid {
    --columns: 1;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 0.75rem;
    @include for-large-tablet-portrait-up {
      --columns: 2;
    }
    @media (min-width: 1400px) {
      --columns: 3;
    }
  }
}

</style>
