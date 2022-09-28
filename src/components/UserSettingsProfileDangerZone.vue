<template>
  <section class="user-danger-zone">
    <SectionHeader>Zona de perigo</SectionHeader>
    <AppButton color="dangerGray">
      Excluir minha conta
    </AppButton>
  </section>
</template>

<script lang="ts" setup>
import SectionHeader from './SectionHeader.vue';
</script>

<style lang="scss" scoped>
.user-danger-zone {
  margin-top: 2rem;
}
</style>
