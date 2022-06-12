<template>
  <component
    class="icon"
    :is="icon"
  />
</template>

<script setup>
import { computed } from 'vue';
import Close from '@/components/icons/IconClose.vue';
import Menu from '@/components/icons/IconMenu.vue';
import Save from '@/components/icons/IconSave.vue';
import ArrowFoward from '@/components/icons/IconArrowFoward.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  switch (props.icon.toLowerCase()) {
    case 'close':
      return Close;
    case 'menu':
      return Menu;
    case 'save':
      return Save;
    case 'arrowfoward':
      return ArrowFoward;
    default:
      return '';
  }
});
</script>

<style lang="scss" scoped>
.icon {
  fill: currentColor;
}
</style>
