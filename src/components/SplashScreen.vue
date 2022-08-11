<template>
  <div class="splash-screen">
    <AppLogo
      class="splash-screen__logo"
      animated
    />
    <LoadingIndicator />
  </div>
</template>

<script lang="ts" setup>
import LoadingIndicator from './LoadingIndicator.vue';
import AppLogo from './AppLogo.vue';
</script>

<style lang="scss" scoped>
.splash-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $color--white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-index--splash-screen;
  .splash-screen__logo {
    width: 15rem;
    height: auto;
    margin-bottom: 2.5rem;
  }
}
</style>
