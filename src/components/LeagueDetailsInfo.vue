<template>
  <section>
    <SectionHeader heading="h3">
      Informações do campeonato
    </SectionHeader>
    <ul class="league-info-list">
      <li class="league-info-list__item">
        <BaseIcon
          class="league-info-list__item-icon"
          icon="football"
        />
        <span class="league-info-list__item-text">Pontos corridos</span>
      </li>
      <li class="league-info-list__item">
        <BaseIcon
          class="league-info-list__item-icon"
          icon="people"
        />
        <span class="league-info-list__item-text">
          {{ league?.numberOfTeams }} participantes
        </span>
      </li>
      <li class="league-info-list__item">
        <BaseIcon
          class="league-info-list__item-icon"
          icon="calendar-check"
        />
        <span class="league-info-list__item-text">
          Criado em {{ getFullDate(league?.createdAt || '') }}
        </span>
      </li>
      <li class="league-info-list__item">
        <BaseIcon
          class="league-info-list__item-icon"
          icon="calendar-edit"
        />
        <span class="league-info-list__item-text">
          Última alteração em {{ getFullDate(league?.updatedAt || '') }}
        </span>
      </li>
    </ul>
    <span>Andamento do campeonato</span>
    <AppProgressBar :value="league?.progress || 0" />
  </section>
</template>

<script lang="ts" setup>
import type { LeagueWithStandings } from '@/types/League';
import { inject, type Ref } from 'vue';
import { getFullDate } from '@/utils';
import SectionHeader from './SectionHeader.vue';
import AppProgressBar from './AppProgressBar.vue';

// Injected values
const league = inject<Ref<LeagueWithStandings>>('league');
</script>

<style lang="scss" scoped>
.league-info-list {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
  &__item {
    display: flex;
    align-items: center;
  }
  &__item-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
  &__item-text {
    flex: 1;
  }
  @include for-tablet-landscape-up {
    grid-template-columns: 1fr 1fr;
    .league-info-list__item:nth-child(n + 3) {
      grid-column: 1 / 3;
    }
  }
}
</style>
