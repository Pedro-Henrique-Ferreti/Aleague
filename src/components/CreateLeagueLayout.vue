<template>
  <div class="create-league-layout">
    <slot />
    <img
      class="create-league-layout__image"
      src="/images/marketer.svg"
      alt=""
      draggable="false"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.create-league-layout {
  display: grid;
  &__image {
    display: none;
    width: auto;
    height: 25rem;
    margin-left: auto;
  }
  @include for-tablet-landscape-up {
    grid-template-columns: 50% auto;
    .create-league-layout__image {
      display: block;
    }
  }
  @include for-desktop-up {
    .create-league-layout__image {
      height: 29.5rem;
    }
  }
}
</style>
