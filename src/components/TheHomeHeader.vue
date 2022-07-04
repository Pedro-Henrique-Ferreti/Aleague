<template>
  <header
    class="home-header"
    :class="[headerIsPinned ? 'home-header--pinned' : '']"
  >
    <div class="home-header__content container-medium">
      <AppLogo />
      <nav
        class="home-header__menu container"
        :class="[menuIsOpen ? 'home-header__menu--open' : '']"
      >
        <hr class="home-header__menu-divider" />
        <BaseButton class="home-header__menu-button">
          Cadastre-se
        </BaseButton>
        <BaseButton
          class="home-header__menu-button"
          color="gray"
          type="link"
          :to="{ name: 'login' }"
        >
          Fazer Login
        </BaseButton>
      </nav>
      <BaseButton
        class="home-header__toggle-menu-button"
        color="gray"
        size="small"
        :icon-left="menuIsOpen ? 'close' : 'menu'"
        @click="menuIsOpen = !menuIsOpen"
      >
        Menu
      </BaseButton>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import AppLogo from '@/components/AppLogo.vue';

const menuIsOpen = ref(false);
const headerIsPinned = ref(false);

document.addEventListener('scroll', () => {
  headerIsPinned.value = window.scrollY > 60;
});
</script>

<style lang="scss" scoped>
.home-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  &--pinned {
    background-color: $color--white;
    box-shadow: $box-shadow--layer-1;
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
    z-index: 1;
    &--open {
      display: flex;
    }
    @include for-large-tablet-portrait-down {
      background-color: $color--white;
      box-shadow: $box-shadow--layer-2;
      @include hide-shadow($top: true);
    }
    @include for-large-tablet-portrait-up {
      display: flex;
      flex-direction: row-reverse;
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
  .home-header__toggle-menu-button {
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
