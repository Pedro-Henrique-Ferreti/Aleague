<template>
  <div class="auth-layout | container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: $color--neutral-100;
}
</style>
