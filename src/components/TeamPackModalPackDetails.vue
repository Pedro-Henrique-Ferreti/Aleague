<template>
  <div class="team-pack-details">
    <header class="team-pack-details__header">
      <img
        src="/images/flags/brazilian-flag.png"
        alt="Team pack icon"
        class="team-pack-details__icon"
      />
      <h3 class="team-pack-details__title">
        {{ name }}
      </h3>
    </header>
    <p>Este pacote irá criar as seguintes equipes:</p>
    <ul class="team-pack-details__team-list">
      <li
        v-for="(team, index) in teams"
        v-text="team.name"
        :key="index"
        class="team-pack-details__team"
        :data-created="team.created"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { TeamPackTeam } from '@/types/TeamPack';
import type { PropType } from 'vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
  teams: {
    type: Array as PropType<TeamPackTeam[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.team-pack-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  &__icon {
    width: 3.5rem;
    margin-right: 1.5rem;
  }
  &__title {
    color: $color--text-darken;
    font-size: 1.25rem;
    font-weight: $font-weight--semibold;
  }
  &__team-list {
    --columns: 2;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 0.5rem 2rem;
    margin-top: 1.5rem;
    @include for-tablet-portrait-up {
      --columns: 3;
    }
    @include for-large-tablet-landscape-up {
      --columns: 4;
    }
  }
  &__team {
    color: $color--text-darken;
    &[data-created="true"] {
      color: $color--text-lighten;
      text-decoration: line-through;
    }
  }
}
</style>
