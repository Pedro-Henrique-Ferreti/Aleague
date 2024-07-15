<template>
  <Dropdown
    class="team-emblem"
    theme="app-popup-large"
    auto-hide
    :triggers="['click']"
    @apply-show="loadEmblems"
  >
    <button
      class="team-emblem__button"
      type="button"
    >
      <img
        class="team-emblem__image"
        src="http://127.0.0.1:8000/assets/emblems/teams/default.png"
        alt=""
      />
    </button>
    <template #popper>
      <TransitionFade>
        <LoadingIndicator
          v-if="teamEmblemStore.isLoadingEmblems"
          class="team-emblem__loader"
        />
        <ErrorState
          v-else-if="teamEmblemStore.showTeamEmblemsErrorMessage"
          message="Não foi possível carregar a lista de escudos."
          @reload="loadEmblems"
        />
        <div
          v-else
          class="team-emblem__list"
        >
          <button
            v-for="emblem in teamEmblemStore.teamEmblems"
            class="team-emblem__item"
            type="button"
            :key="emblem.id"
          >
            <img
              class="team-emblem__image"
              alt=""
              :src="emblem.url"
            />
          </button>
        </div>
      </TransitionFade>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
import { useTeamEmblemStore } from '@/stores/teamEmblem';
import TransitionFade from './TransitionFade.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import ErrorState from './ErrorState.vue';

const teamEmblemStore = useTeamEmblemStore();

function loadEmblems() {
  if (teamEmblemStore.teamEmblems.length === 0) {
    teamEmblemStore.loadTeamEmblems();
  }
}
</script>

<style lang="scss" scoped>
.team-emblem {
  display: grid;
  place-items: center;
  place-self: center;
  width: 2.25rem;
  height: 2.25rem;
  &__button {
    width: inherit;
    height: inherit;
  }
  &__image {
    max-width: 88%;
    max-height: 88%;
  }
  &__loader {
    margin: auto 0;
  }
  &__list {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(2.25rem, 1fr));
    gap: 0.5rem;
  }
  &__item {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: $radius--small;
    transition: background-color $transition--fastest;
    &:hover:not([data-selected="true"]) {
      background-color: $color--neutral-200;
    }
    &[data-selected="true"] {
      background-color: $color--blue-1100;
    }
  }
}
</style>
