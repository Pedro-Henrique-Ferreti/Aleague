<template>
  <div class="competition-layout">
    <slot />
    <img
      class="competition-layout__image"
      src="/images/marketer.svg"
      alt=""
      draggable="false"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.competition-layout {
  display: grid;
  &__image {
    display: none;
    width: auto;
    height: 25rem;
    margin-left: auto;
  }
  @include for-tablet-landscape-up {
    grid-template-columns: 50% auto;
    .competition-layout__image {
      display: block;
    }
  }
  @include for-desktop-up {
    .competition-layout__image {
      height: 29.5rem;
    }
  }
}
</style>
