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
    <AppIconButton
      class="participant-card__button"
      theme="hover-danger"
      type="button"
      aria-label="Remover participante"
      title="Remover participante"
      icon="close"
      @click="$emit('remove')"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import TeamSlot from './TeamSlot.vue';
import AppIconButton from './AppIconButton.vue';

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
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid $color--light-gray-1;
  box-shadow: $shadow--extra-small;
  &__name {
    flex: 1;
    font-size: 1.125rem;
  }
  &__button {
    --icon-size: 0.75rem;
    margin-left: 1rem;
  }
}
</style>
