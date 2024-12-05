<template>
  <button
    class="settings-button"
    type="button"
    aria-label="Configurações"
  >
    <IconSettings class="settings-button__icon" />
  </button>
</template>

<script lang="ts" setup>
import IconSettings from '@/assets/icons/Settings.svg';
</script>

<style lang="scss" scoped>
.settings-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
}
</style>
