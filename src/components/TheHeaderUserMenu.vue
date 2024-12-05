<template>
  <Menu theme="user-menu">
    <button
      class="user-menu"
      type="button"
      aria-label="Show user menu"
    >
      <img
        class="user-menu__picture"
        alt="User profile picture"
        :src="authStore.user?.avatar"
      />
      <IconChevron class="user-menu__icon" />
    </button>
    <template #popper>
      <img
        class="user-menu__popup-picture"
        alt="User profile picture"
        :src="authStore.user?.avatar"
      />
      <span class="user-menu__popup-username">
        {{ authStore.user?.username }}
      </span>
      <ul class="user-menu__popup-list">
        <li class="user-menu__popup-item">
          <router-link
            class="user-menu__popup-link"
            to="#"
          >
            Meu perfil
          </router-link>
        </li>
        <li class="user-menu__popup-item">
          <router-link
            class="user-menu__popup-link"
            to="#"
          >
            Preferências
          </router-link>
        </li>
        <li class="user-menu__popup-item">
          <button
            class="user-menu__popup-link"
            type="button"
            @click="authStore.logout"
          >
            Sair
          </button>
        </li>
      </ul>
    </template>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu } from 'floating-vue';
import { useAuthStore } from '@/stores/auth';
import IconChevron from '@/assets/icons/Chevron.svg';

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.user-menu {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  outline-color: $color--focus-ring;
  &__picture {
    width: 2.5rem;
    height: auto;
    @include for-large-tablet-landscape-up {
      width: 3rem;
    }
  }
  &__icon {
    width: 0.875rem;
    height: auto;
    @include for-large-tablet-landscape-down {
      display: none;
    }
  }
  &__popup-picture {
    width: 3rem;
    height: auto;
    margin: 0 auto;
  }
  &__popup-username {
    display: block;
    margin-top: 0.25rem;
    color: $color--text-strong;
    font-weight: $font-weight--medium;
    text-align: center;
  }
  &__popup-list {
    display: grid;
    gap: 0.75rem;
    margin-top: 1rem;
    font-size: 0.875rem;
  }
  &__popup-item:last-child {
    padding-top: 0.75rem;
    border-top: 1px solid $color--neutral-300;
  }
  &__popup-link:hover {
    text-decoration: underline;
  }
}
</style>
