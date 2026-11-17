<template>
  <AppTooltip
    label="Abrir painel de classificação"
    class="tooltip-left"
  >
    <AppButton
      class="btn-square btn-soft"
      aria-label="Abrir painel de classificação"
      :aria-controls="ariaControls"
      :aria-expanded="ariaExpanded"
      :icon-left="IconArrowBarToLeft"
      @click="$emit('click')"
    />
  </AppTooltip>
</template>

<script lang="ts" setup>
import { IconArrowBarToLeft } from '@tabler/icons-vue';

defineProps<{
  ariaControls?: string;
  ariaExpanded?: boolean;
}>();
defineEmits<{ click: [] }>();
</script>
