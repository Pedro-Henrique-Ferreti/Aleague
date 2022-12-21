<template>
  <div class="competition-form-layout">
    <slot />
    <img
      class="competition-form-layout__image"
      src="/images/marketer.svg"
      alt=""
      draggable="false"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.competition-form-layout {
  display: grid;
  &__image {
    display: none;
    width: auto;
    height: 25rem;
    margin-left: auto;
  }
  @include for-tablet-landscape-up {
    grid-template-columns: 50% auto;
    .competition-form-layout__image {
      display: block;
    }
  }
  @include for-desktop-up {
    .competition-form-layout__image {
      height: 29.5rem;
    }
  }
}
</style>
