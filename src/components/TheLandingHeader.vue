<template>
  <header
    class="landing-header"
    :data-pinned="headerIsPinned"
  >
    <div class="landing-header__content container-medium">
      <AppLogo />
      <AppButton
        class="landing-header__toggle-menu-button"
        type="button"
        color="gray"
        size="small"
        aria-controls="landing-header-nav"
        :icon-left="menuIsOpen ? 'close' : 'menu'"
        :aria-expanded="menuIsOpen"
        @click="menuIsOpen = !menuIsOpen"
      >
        <span>Menu</span>
      </AppButton>
      <nav
        class="landing-header__menu container"
        id="landing-header-nav"
        :data-open="menuIsOpen"
      >
        <hr class="landing-header__menu-divider" />
        <AppButton
          class="landing-header__menu-button"
          color="gray"
          :to="{ name: 'login' }"
        >
          Fazer Login
        </AppButton>
        <AppButton
          class="landing-header__menu-button"
          :to="{ name: 'register' }"
        >
          Cadastre-se
        </AppButton>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AppLogo from './AppLogo.vue';

const menuIsOpen = ref(false);
const headerIsPinned = ref(false);

document.addEventListener('scroll', () => {
  headerIsPinned.value = window.scrollY > 60;
});
</script>

<style lang="scss" scoped>
.landing-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: $z-index--landing-header;
  &[data-pinned="true"] {
    background-color: $color--white;
    box-shadow: $shadow--small;
    position: fixed;
    animation: header-slide-down $transition--slowest ease-in-out;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
  }
  &__menu {
    display: none;
    flex-direction: column;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    z-index: $z-index--landing-header-menu;
    &[data-open="true"] {
      display: flex;
    }
    @include for-large-tablet-portrait-down {
      background-color: $color--white;
      box-shadow: $shadow--medium;
      @include hide-shadow($top: true);
    }
    @include for-large-tablet-portrait-up {
      display: flex;
      flex-direction: row;
      align-items: unset;
      gap: 1.5rem;
      width: auto;
      margin: 0;
      padding: 0;
      position: unset;
    }
  }
  &__menu-divider {
    margin-bottom: 1.5rem;
    background-color: $color--light-gray-1;
    @include for-large-tablet-portrait-up {
      display: none;
    }
  }
  &__menu-button {
    @include for-large-tablet-portrait-down {
      width: 100%;
      max-width: 25rem;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
    @include for-large-tablet-portrait-up {
      width: 9.5rem;
    }
  }
  .landing-header__toggle-menu-button {
    @include for-large-tablet-portrait-up {
      display: none;
    }
  }
}

@keyframes header-slide-down {
  from {
    opacity: 0;
    top: -100px;
  }
  to {
    opacity: 1;
    top: 0;
  }
}
</style>
