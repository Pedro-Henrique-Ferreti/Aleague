<template>
  <main class="edit-team | container-small">
    <TransitionFade>
      <LoadingIndicator v-if="isLoading" />
      <ErrorState
        v-else-if="errorMessage"
        :message="errorMessage"
        @reload="getTeam"
      />
      <div v-else-if="team">
        <PageHeader
          title="Editar equipe"
          :breadcrumb-items="breadcrumbItems"
        />
        <div class="edit-team__content">
          <EditTeamForm :team="team" />
          <EditTeamDetails :team="team" />
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
import api from '@/api';
import TransitionFade from '@/components/TransitionFade.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import EditTeamForm from '@/components/EditTeamForm.vue';
import EditTeamDetails from '@/components/EditTeamDetails.vue';

const route = useRoute();

// Team
const team = ref<TeamDetails | null>(null);

// Breadcrumb items
const breadcrumbItems = computed<Breadcrumb[]>(() => ([
  { title: 'Equipes', to: { name: 'teams' } },
  { title: team.value?.name || '', to: { name: 'show-team', params: { id: team.value?.id } } },
  'Editar',
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
</script>

<style lang="scss" scoped>
.edit-team {
  &__content {
    display: flex;
    flex-direction: column-reverse;
    gap: 1.5rem;
    @include for-large-tablet-portrait-up {
      display: grid;
      grid-template-columns: 1fr 17.75rem;
    }
  }
}
</style>
