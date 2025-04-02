<template>
  <header class="header | container">
    <div class="header__logo-wrapper">
      <!-- <TheHeaderMenuButton
        :menu-is-open="menuIsOpen"
        @click="menuIsOpen = !menuIsOpen"
      /> -->
      <AppLogo class="header__logo" />
    </div>
    <!-- <nav
      class="header__nav"
      id="header-nav"
      :data-open="menuIsOpen"
    >
      <ul class="header__nav-list">
        <TheHeaderNavItem
          name="Campeonatos"
          :to="{ name: 'tournaments' }"
        />
      </ul>
    </nav> -->
    <div class="header__controls">
      <TheHeaderButtonSettings />
      <TheHeaderButtonNotifications />
      <TheHeaderUserMenu />
    </div>
  </header>
</template>

<script lang="ts" setup>
// import { ref, watch } from 'vue';
// import { useRoute } from 'vue-router';
import AppLogo from './AppLogo.vue';
import TheHeaderUserMenu from './TheHeaderUserMenu.vue';
import TheHeaderButtonSettings from './TheHeaderButtonSettings.vue';
import TheHeaderButtonNotifications from './TheHeaderButtonNotifications.vue';
// import TheHeaderNavItem from './TheHeaderNavItem.vue';
// import TheHeaderMenuButton from './TheHeaderMenuButton.vue';

// const route = useRoute();

// Menu
// const menuIsOpen = ref(false);

// watch(() => route.name, () => {
//   menuIsOpen.value = false;
// });
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--rt-headerHeight);
  position: relative;
  @include for-large-tablet-landscape-up {
    --container-padding: calc(var(--spacing--screen-vertical-padding) + 1.5rem);
  }
  &__logo-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__logo {
    @include for-large-tablet-landscape-down {
      height: 2rem;
    }
  }
  &__controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    & > *:last-child {
      margin-left: 0.5rem;
    }
  }
  &__nav {
    --nav-padding: 1.25rem;
    width: calc(100% - (var(--container-padding) * 2));
    padding: var(--nav-padding);
    background-color: $color--white;
    border-radius: 1rem;
    box-shadow: $shadow--popup;
    position: absolute;
    top: calc(-100% - var(--rt-headerHeight) - var(--nav-padding) - 0.5rem);
    z-index: 1;
    &[data-open="true"] {
      top: var(--rt-headerHeight);
    }
    @include for-large-tablet-landscape-up {
      width: initial;
      padding: 0;
      background-color: transparent;
      box-shadow: none;
      position: initial;
      z-index: initial;
    }
  }
  &__nav-list {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-direction: column;
    @include for-large-tablet-landscape-up {
      flex-direction: row;
      gap: 3.5rem;
    }
  }
}
</style>
