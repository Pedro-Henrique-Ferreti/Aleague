<template>
  <div class="header-controls">
    <div class="header-controls__buttons">
      <TheHeaderControlsButton icon="bell" />
      <TheHeaderControlsButton icon="gear" />
    </div>
    <TheHeaderLoggedInUser />
  </div>
</template>

<script setup>
import TheHeaderLoggedInUser from './TheHeaderLoggedInUser.vue';
import TheHeaderControlsButton from './TheHeaderControlsButton.vue';
</script>

<style lang="scss" scoped>
.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &__buttons {
    display: flex;
    gap: 0.5rem;
  }
  @include for-large-tablet-portrait-up {
    justify-content: flex-end;
    .header-controls__buttons {
      &:after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 1.75rem;
        background-color: $color--light-gray-1;
        margin: 0 1rem;
      }
    }
  }
  @include for-desktop-up {
    width: auto;
  }
}
</style>
