<template>
  <form
    class="subtitles"
    @submit.prevent
  >
    <AppCard title="Legendas">
      <p v-if="tournament.type === TournamentFormat.ALL_PLAY_ALL">
        Você pode editar ou criar legendas para a tabela de classificação do campeonato.
      </p>
      <p v-else>
        Você pode editar ou criar legendas para a tabela de classificação das fases de grupos.
        As legendas irão auxiliá-lo ao mover equipes para as próximas fases do campeonato.
      </p>
      <div class="subtitles__groups">
        <div
          v-for="n in 3"
          class="subtitles__group"
          :key="n"
        >
          <h3 class="subtitles__group-title">
            Fase de Grupos
          </h3>
          <div class="subtitles__group-items">
            <EditTournamentSubtitleMenu>
              <AppIconButton
                color="secondary"
                :icon="IconPlus"
              />
            </EditTournamentSubtitleMenu>
          </div>
        </div>
      </div>
    </AppCard>
    <AppButton
      class="subtitles__form-button"
      type="submit"
    >
      Salvar alterações
    </AppButton>
  </form>
</template>

<script lang="ts" setup>
import type { Tournament } from '@/types/Tournament';
import type { PropType } from 'vue';
import { TournamentFormat } from '@/constants/tournament';
import IconPlus from '@/assets/icons/Plus.svg';
import AppButton from './AppButton.vue';
import AppCard from './AppCard.vue';
import AppIconButton from './AppIconButton.vue';
import EditTournamentSubtitleMenu from './EditTournamentSubtitleMenu.vue';

defineProps({
  tournament: {
    type: Object as PropType<Tournament>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.subtitles {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  &__groups {
    display: grid;
    gap: 1.25rem;
    margin-top: 1.5rem;
  }
  &__group-title {
    margin-bottom: 0.5rem;
    color: $color--text-strong;
    font-weight: $font-weight--medium;
  }
  &__group-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 1px solid $color--neutral-300;
    border-radius: $radius--medium;
  }
  &__form-button {
    margin-left: auto;
  }
}
</style>
