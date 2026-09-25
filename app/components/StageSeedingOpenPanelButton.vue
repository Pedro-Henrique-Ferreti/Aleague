<template>
  <AppTooltip
    label="Abrir painel de classificação"
    class="tooltip-left"
  >
    <AppButton
      class="btn-square btn-soft"
      aria-label="Abrir painel de classificação"
      :icon-left="IconArrowBarToLeft"
      @click="$emit('click')"
    />
  </AppTooltip>
</template>

<script lang="ts" setup>
import { IconArrowBarToLeft } from '@tabler/icons-vue';

defineEmits<{ click: [] }>();
</script>
