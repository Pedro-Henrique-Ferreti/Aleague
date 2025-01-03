<template>
  <div class="form">
    <AppButton>
      Adicionar fase
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import AppButton from './AppButton.vue';
</script>

<style lang="scss" scoped>
.form {
  @include scrollbar;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30rem;
  padding: 1.25rem;
  margin-top: 1.5rem;
  border: 1px solid $color--neutral-300;
  border-radius: 1rem;
  background-image: url('/images/dotted-background.svg');
  background-position: center 7%;
  overflow-y: auto;
}
</style>
