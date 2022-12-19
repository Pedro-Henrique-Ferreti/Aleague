<template>
  <form
    class="competition-form"
    @submit.prevent="$emit('submit')"
  >
    <slot />
    <div class="competition-form__footer">
      <slot name="footer" />
    </div>
  </form>
</template>

<script lang="ts" setup>
defineEmits(['submit']);
</script>

<style lang="scss" scoped>
.competition-form {
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  &__footer {
    display: grid;
    gap: 1rem;
    margin-top: auto;
    padding-top: 3rem;
    @include for-tablet-portrait-up {
      grid-template-columns: repeat(2, 11rem);
      gap: 1.5rem;
    }
  }
}
</style>
