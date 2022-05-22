<template>
  <component
    class="button"
    :is="componentTag"
  >
    Content here
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
});

const componentTag = computed(() => {
  switch (props.type) {
    case 'link':
      return 'router-link';
    case 'externalLink':
      return 'a';
    default:
      return 'button';
  }
});
</script>
