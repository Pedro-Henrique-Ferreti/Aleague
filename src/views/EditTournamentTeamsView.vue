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
      class="tournament | container-medium"
    >
      <PageHeader
        title="Editar equipes"
        :breadcrumb-items="breadcrumbItems"
      >
        <AppButton>Salvar alterações</AppButton>
      </PageHeader>
    </div>
  </TransitionFade>
</template>

<script lang="ts" setup>
import { useTournament } from '@/composables/useTournament';
import AppButton from '@/components/AppButton.vue';
import ErrorState from '@/components/ErrorState.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import PageHeader from '@/components/PageHeader.vue';
import TransitionFade from '@/components/TransitionFade.vue';

const {
  tournament, isLoading, errorMessage, getTournament, breadcrumbItems,
} = useTournament({ currentPageName: 'Equipes' });
</script>
