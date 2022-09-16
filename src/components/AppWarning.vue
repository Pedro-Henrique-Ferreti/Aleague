<template>
  <div class="warning">
    <BaseIcon
      class="warning__icon"
      icon="info"
    />
    <div class="warning__body">
      <span class="warning__title">
        {{ title }}
      </span>
      <slot>
        <span>{{ message }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Aviso',
  },
  message: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.warning {
  display: flex;
  width: 100%;
  padding: 1rem;
  border: 1px solid $color--tertiary-lighten-3;
  border-radius: 0.5rem;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 0.375rem;
    height: 100%;
    background-color: $color--tertiary;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    position: absolute;
    top: 0;
    left: -1px;
  }
  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.125rem;
    fill: $color--tertiary;
  }
  &__body {
    flex: 1;
    margin-left: 1rem;
    * {
      color: $color--text-darken;
    }
  }
  &__title {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
  }
}
</style>
