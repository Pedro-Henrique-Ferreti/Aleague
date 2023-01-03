<template>
  <h2 class="section-title">
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
.section-title {
  width: fit-content;
  color: $color--text-darken;
  font-size: 1.5rem;
  font-weight: $font-weight--semibold;
  @include for-large-tablet-landscape-up {
    font-size: 2rem;
  }
  &::after {
    content: '';
    display: block;
    width: 75%;
    height: 2px;
    margin: 0 auto;
    margin-top: 0.25rem;
    background-color: $color--primary;
  }
}
</style>
