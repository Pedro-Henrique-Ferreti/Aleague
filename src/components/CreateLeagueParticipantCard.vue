<template>
  <div
    class="participant-card"
    :class="{ 'participant-card--empty': cardIsEmpty }"
  >
    <template v-if="cardIsEmpty">
      <div class="participant-card__empty-icon-wrapper">
        <BaseIcon
          class="participant-card__empty-icon"  
          icon="team-shield"
        />
      </div>
      <span class="participant-card__name">
        Equipe {{ index }}
      </span>
    </template>
    <template v-else>
      <span class="participant-card__name">
        {{ name }}
      </span>
      <button
        class="participant-card__button"
        type="button"
        aria-label="Remove participant"
        @click="$emit('remove')"
      >
        <BaseIcon
          class="participant-card__button-icon"
          icon="close"
        />
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineEmits(['remove']);
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  index: {
    type: Number,
    default: 0,
  },
});

const cardIsEmpty = computed(() => !props.name);
</script>

<style lang="scss" scoped>
.participant-card {
  &--empty {
    justify-content: center;
    gap: 1rem;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23B0CDFAFF' stroke-width='2' stroke-dasharray='8%2c8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  }
  &:not(.participant-card--empty) {
    border: 1px solid $color--light-gray-1;
    justify-content: space-between;
    .participant-card__name {
      flex: 1;
    }
  }
  display: flex;
  align-items: center;
  min-height: 3.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  &__name {
    font-size: 1.125rem;
  }
  &__empty-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    background-color: $color--tertiary-lighten-5;
    border-radius: 50%;
  }
  &__empty-icon {
    width: 1rem;
    height: 1rem;
    fill: $color--tertiary-lighten-1;
  }
  &__button {
    @include focus-ring;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    margin-left: 1rem;
    border: 1px solid $color--light-gray-1;
    border-radius: 0.25rem;
    transition: background-color $transition--fastest ease-in;
    &:hover {
      background-color: $color--light-gray-2;
    }
  }
  &__button-icon {
    width: 0.75rem;
    height: 0.75rem;
  }
}
</style>
