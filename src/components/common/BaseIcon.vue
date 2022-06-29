<template>
  <component :is="icon" />
</template>

<script setup>
import { computed } from 'vue';
import Close from '@/components/icons/IconClose.vue';
import Menu from '@/components/icons/IconMenu.vue';
import Save from '@/components/icons/IconSave.vue';
import ArrowFoward from '@/components/icons/IconArrowFoward.vue';
import ErrorCircle from '@/components/icons/IconErrorCircle.vue';

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
    case 'errorcircle':
      return ErrorCircle;
    default:
      return '';
  }
});
</script>
