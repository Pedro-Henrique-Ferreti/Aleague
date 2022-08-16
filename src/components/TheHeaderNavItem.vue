<template>
  <li class="header-nav-item">
    <router-link
      class="header-nav-item__link"
      :to="path"
      :aria-label="ariaLabel"
    >
      <BaseIcon
        class="header-nav-item__icon header-nav-item__icon--mobile"
        :icon="iconMobile"
      />
      <BaseIcon
        class="header-nav-item__icon header-nav-item__icon--desktop"
        :icon="iconDesktop"
      />
      <span class="header-nav-item__text">
        <slot />
      </span>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  path: {
    type: [String, Object],
    required: true,
  },
  iconMobile: {
    type: String,
    required: true,
  },
  iconDesktop: {
    type: String,
    required: true,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.header-nav-item {
  --color: #{$color--text};
  --indicator-display: none;

  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  &__link {
    @include focus-ring($apply-position: false);
    display: flex;
    align-items: center;
    &.router-link-active {
      --color: #{$color--secondary};
      --indicator-display: block;
    }
    &::before {
      content: '';
      display: var(--indicator-display);
      height: 4px;
      background-color: var(--color);
      border-radius: 0 0 4px 4px;
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      @include for-desktop-up {
        top: unset;
        border-radius: 4px 4px 0 0;
        bottom: -1px;
      }
    }
  }
  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--color);
    &--desktop {
      display: none;
    }
    @include for-desktop-up {
      width: 1rem;
      height: 1rem;
      &--mobile {
        display: none;
      }
      &--desktop {
        display: block;
      }
    }
  }
  &__text {
    margin-left: 0.25rem;
    color: var(--color);
    font-weight: $font-weight--semibold;
    @include for-desktop-down {
      display: none;
    }
  }
}
</style>
