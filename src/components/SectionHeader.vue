<template>
  <header class="section-header">
    <component
      class="section-header__title"
      :is="heading"
    >
      <slot />
    </component>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  heading: {
    type: String,
    default: 'h2',
  },
});
</script>

<style lang="scss" scoped>
.section-header {
  margin-bottom: 1.5rem;
  &__title {
    display: flex;
    align-items: flex-end;
    flex: 1;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
    white-space: nowrap;
    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 1px;
      margin-left: 1rem;
      background-color: $color--light-gray-1;
      transform: translateY(-6px);
    }
  }
}
</style>
