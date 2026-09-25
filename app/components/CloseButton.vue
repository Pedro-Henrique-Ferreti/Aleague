<template>
  <button
    v-text="'✕'"
    type="button"
    class="btn btn-sm btn-circle btn-ghost"
    :aria-label="ariaLabel ?? 'Fechar'"
  />
</template>

<script lang="ts" setup>
defineProps<{ ariaLabel?: string }>();
</script>
