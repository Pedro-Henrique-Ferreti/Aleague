<template>
  <nav class="header-nav">
    <ul class="header-nav__list">
      <TheHeaderNavItem
        icon-mobile="home"
        icon-desktop="home-outline"
        aria-label="Go to Home page"
        :path="{ name: 'home' }"
      >
        Início
      </TheHeaderNavItem>
      <TheHeaderNavItem
        icon-mobile="team-shield"
        icon-desktop="team-shield-outline"
        aria-label="Go to My teams page"
        path="/"
      >
        Minhas equipes
      </TheHeaderNavItem>
      <TheHeaderNavItem
        icon-mobile="trophy"
        icon-desktop="trophy-outline"
        aria-label="Go to My championships page"
        path="/"
      >
        Meus campeonatos
      </TheHeaderNavItem>
      <TheHeaderNavItem
        icon-mobile="plus"
        icon-desktop="plus"
        aria-label="Go to Create championship page"
        path="/"
      >
        Criar campeonato
      </TheHeaderNavItem>
    </ul>
  </nav>
</template>

<script setup>
import TheHeaderNavItem from './TheHeaderNavItem.vue';
</script>

<style lang="scss" scoped>
.header-nav {
  height: 4rem;
  padding: 0 1.5rem;
  border-top: 1px solid $color--light-gray-1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  &__list {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    @include for-desktop-down {
      max-width: 560px;
      margin: auto;
    }
  }
  @include for-desktop-up {
    display: flex;
    flex: 1;
    height: 100%;
    padding: 0 4.5rem;
    border-top: none;
    position: relative;
    .header-nav__list {
      gap: 1.5rem;
      justify-content: unset;
    }
  }
}
</style>
