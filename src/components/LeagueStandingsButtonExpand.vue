<template>
  <td
    class="league-standings-button-expand"
    role="button"
    tabindex="0"
    :data-expanded="expanded"
    @click="$emit('click')"
    @keypress.enter="$emit('click')"
  >
    <BaseIcon
      class="league-standings-button-expand__icon"
      icon="chevron"
    />
  </td>
</template>

<script lang="ts" setup>
import BaseIcon from './common/BaseIcon.vue';

defineEmits(['click']);
defineProps({
  expanded: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.league-standings-button-expand {
  @include focus-ring;
  --rotate: 90deg;
  --color: #{$color--text};
  --background-color: #{$color--light-gray-2};
  &:hover {
    --background-color: #{$color--light-gray-1};
  }
  &[data-expanded="true"] {
    --rotate: -90deg;
    --color: #{$color--white};
    --background-color: #{$color--primary};
  }
  width: 2.25rem;
  background-color: var(--background-color);
  transition: background-color $transition--fastest ease-in;
  cursor: pointer;
  &__icon {
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    margin: auto;
    fill: var(--color);
    transform: rotate(var(--rotate));
    transition: transform 0.2s ease-in, fill 0.2s ease-in;
  }
}
</style>
