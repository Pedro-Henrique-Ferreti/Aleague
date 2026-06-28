<template>
  <div class="w-1/4 pl-1 border-l border-base-200">
    <AppTooltip label="Fechar painel">
      <AppButton
        class="btn-square btn-ghost btn-sm -ml-0.5"
        aria-label="Fechar painel"
        :icon-left="IconLayoutSidebarLeftExpand"
        @click="$emit('closePanel')"
      />
    </AppTooltip>
  </div>
</template>

<script lang="ts" setup>
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-vue';

defineEmits<{
  closePanel: [];
}>();
</script>
