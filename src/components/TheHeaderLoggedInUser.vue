<template>
  <div class="header-user">
    <OnClickOutside @trigger="showMenu = false">
      <button
        class="header-user__button"
        type="button"
        aria-label="Toggle user info"
        @click="showMenu = !showMenu"
      >
        <div class="header-user__button-content">
          <span class="header-user__name">
            {{ userStore.user?.username }}
          </span>
          <img
            class="header-user__avatar"
            alt="User profile picture"
            draggable="false"
            :src="userStore.user?.avatar"
          />
        </div>
        <BaseIcon
          class="header-user__icon-arrow"
          :class="{ 'header-user__icon-arrow--rotate': showMenu }"
          icon="chevron"
        />
      </button>
      <AppTransition name="scroll-y">
        <TheHeaderLoggedInUserMenu
          v-show="showMenu"
          class="header-user__menu"
          @close="showMenu = !showMenu"
        />
      </AppTransition>
    </OnClickOutside>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { OnClickOutside } from '@vueuse/components';
import { useUserStore } from '@/stores/userStore';
import AppTransition from './AppTransition.vue';
import TheHeaderLoggedInUserMenu from './TheHeaderLoggedInUserMenu.vue';

const userStore = useUserStore();

const showMenu = ref(false);
</script>

<style lang="scss" scoped>
.header-user {
  position: relative;
  &__button {
    display: flex;
    align-items: center;
    @include focus-ring;
  }
  &__button-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    @include for-large-tablet-portrait-up {
      flex-direction: row-reverse;
      margin-right: 0.5rem;
    }
  }
  &__avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
  &__icon-arrow {
    width: 0.75rem;
    height: 0.75rem;
    transform: rotate(90deg);
    transition: transform $transition--fastest ease-out;
    &--rotate {
      transform: rotate(-90deg);
    }
    @include for-large-tablet-portrait-down {
      display: none;
    }
  }
  &__menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: $z-index--header-user-info-menu;
  }
}
</style>
