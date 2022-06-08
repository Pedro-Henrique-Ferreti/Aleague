<template>
  <header class="home-header container-medium">
    <AppLogo />
    <div class="home-header__menu container-small"
      :class="[menuIsOpen ? 'home-header__menu--open' : '']"
    >
      <hr class="home-header__menu-divider" />
      <BaseButton class="home-header__menu-button">Cadastre-se</BaseButton>
      <BaseButton class="home-header__menu-button"
        color="gray"
      >
        Fazer Login
      </BaseButton>
    </div>
    <BaseButton
      class="home-header__toggle-menu-button"
      color="gray"
      size="small"
      :icon-left="menuIsOpen ? 'close' : 'menu'"
      @click="menuIsOpen = !menuIsOpen"
    >
      Menu
    </BaseButton>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import AppLogo from '@/components/AppLogo.vue';

const menuIsOpen = ref(false);
</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  &__menu {
    display: none;
    flex-direction: column;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    background-color: $color--white;
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    z-index: 1;
    &--open {
      display: flex;
    }
    @include for-large-tablet-portrait-down {
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
</style>
