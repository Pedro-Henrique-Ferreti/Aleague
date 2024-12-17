<template>
  <main class="team">
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
        @reload="getTeam"
      />
      <div v-else-if="team">
        <PageHeader :breadcrumb-items="breadcrumbItems" />
        <div class="team__grid">
          <ShowTeamProfile
            class="team__profile-card"
            :team="team"
            @update-favorite-status="(team) ? team.isFavorite = $event : null"
          />
          <ShowTeamRivals
            class="team__rivals-card"
            :team="team"
            @update-rivals="(team) ? team.rivals = $event : null"
          />
        </div>
      </div>
    </TransitionFade>
  </main>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import type { TeamDetails } from '@/types/Team';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTitle } from '@/composables/useTitle';
import api from '@/api';
import TransitionFade from '@/components/TransitionFade.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import ShowTeamProfile from '@/components/ShowTeamProfile.vue';
import ShowTeamRivals from '@/components/ShowTeamRivals.vue';

const route = useRoute();

// Team
const team = ref<TeamDetails | null>(null);

// Breadcrumb items
const breadcrumbItems = computed<Breadcrumb[]>(() => ([
  { title: 'Equipes', to: { name: 'teams' } },
  team.value?.name || '',
]));

// Get team
const isLoading = ref(true);
const errorMessage = ref('');

async function getTeam() {
  isLoading.value = true;
  team.value = null;
  errorMessage.value = '';

  try {
    const { data } = await api.teamService.getTeamById(route.params.id as string);

    team.value = data;
  } catch (error: any) {
    errorMessage.value = 'Algo deu errado e não foi possível carregar a equipe.';
  } finally {
    isLoading.value = false;
  }
}

getTeam();

watch(() => route.params.id, getTeam);

// Page title
const pageTitle = computed(() => team.value?.name);
useTitle(pageTitle);
</script>

<style lang="scss" scoped>
.team {
  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.5rem;
  }
  &__profile-card {
    grid-column: span 6;
    @include for-large-tablet-portrait-up {
      grid-column: 1 / 4;
    }
  }
  &__rivals-card {
    grid-column: span 6;
    @include for-large-tablet-portrait-up {
      grid-column: 4 / 7;
    }
  }
}
</style>
