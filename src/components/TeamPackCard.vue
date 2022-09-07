<template>
  <button
    type="button"
    class="team-pack-card"
    :class="{ 'team-pack-card--applied': applied }"
    :disabled="applied"
    @click="$emit('click')"
  >
    <BaseIcon
      v-if="applied"
      class="team-pack-card__icon-applied"
      icon="check-circle"
    />
    <img
      class="team-pack-card__image"
      alt="Team pack icon"
      src="/images/brazil-flag.png"
    />
    <span class="team-pack-card__name">
      {{ name }}
    </span>
    <span class="team-pack-card__count">
      {{ countLabel }}
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineEmits(['click']);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  applied: {
    type: Boolean,
    default: false,
  },
  teamsCount: {
    type: Number,
    default: 0,
  },
});

const countLabel = computed(() => {
  if (props.applied) {
    return 'Pacote aplicado';
  }

  if (props.teamsCount === 0) {
    return 'Nenhuma equipe';
  }

  if (props.teamsCount === 1) {
    return '1 equipe';
  }

  return `${props.teamsCount} equipes`;
});
</script>

<style lang="scss" scoped>
.team-pack-card {
  @include focus-ring($apply-position: false);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.5rem;
  position: relative;
  transition: background-color $transition--fastest ease-in;
  &:hover {
    background: $color--light-gray-2;
  }
  &--applied {
    background-color: $color--success-lighten-4;
    border-color: $color--success-darken-2;
  }
  &__icon-applied {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    fill: $color--success-darken-2;
  }
  &__image {
    width: 4rem;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }
  &__name {
    color: $color--text-darken;
    font-weight: $font-weight--semibold;
  }
  &__count {
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
}
</style>
