<template>
  <section class="user-danger-zone">
    <UserSettingsHeader>Zona de perigo</UserSettingsHeader>
    <AppButton color="dangerGray">
      Excluir minha conta
    </AppButton>
  </section>
</template>

<script lang="ts" setup>
import UserSettingsHeader from './UserSettingsHeader.vue';
</script>

<style lang="scss" scoped>
.user-danger-zone {
  margin-top: 2rem;
}
</style>
