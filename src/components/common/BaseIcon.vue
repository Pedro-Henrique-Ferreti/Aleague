<template>
  <component :is="icon" />
</template>

<script setup>
import { computed } from 'vue';
import ArrowFoward from '@/components/icons/IconArrowFoward.vue';
import Check from '@/components/icons/IconCheck.vue';
import Close from '@/components/icons/IconClose.vue';
import ErrorCircle from '@/components/icons/IconErrorCircle.vue';
import Menu from '@/components/icons/IconMenu.vue';
import Save from '@/components/icons/IconSave.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  switch (props.icon.toLowerCase().replaceAll('-', '')) {
    case 'arrowfoward':
      return ArrowFoward;
    case 'check':
      return Check;
    case 'close':
      return Close;
    case 'errorcircle':
      return ErrorCircle;
    case 'menu':
      return Menu;
    case 'save':
      return Save;
    default:
      return '';
  }
});
</script>
