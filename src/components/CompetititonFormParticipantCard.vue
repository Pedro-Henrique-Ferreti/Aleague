<template>
  <TeamSlot v-if="cardIsEmpty">
    Equipe {{ index }}
  </TeamSlot>
  <div
    v-else
    class="participant-card"
  >
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
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import TeamSlot from './TeamSlot.vue';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 3.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid $color--light-gray-1;
  &__name {
    flex: 1;
    font-size: 1.125rem;
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
