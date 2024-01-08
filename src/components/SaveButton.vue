<template>
  <AppButton
    icon-rounded
    class="save-button"
    icon-left="save"
  >
    Salvar
  </AppButton>
</template>

<script lang="ts" setup>
import AppButton from './AppButton.vue';
</script>

<style lang="scss" scoped>
.save-button {
  --min-width: 9rem !important;
}
</style>
