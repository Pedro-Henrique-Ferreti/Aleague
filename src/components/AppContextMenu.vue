<template>
  <Dropdown
    theme="context-menu"
    auto-hide
  >
    <slot />
    <template #popper="{ hide }">
      <div class="context-menu">
        <slot name="menu" :hide="hide" />
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
</script>

<style lang="scss" scoped>
.context-menu {
  display: grid;
  gap: 0.375rem;
  padding: 0.375rem 0;
}
</style>
