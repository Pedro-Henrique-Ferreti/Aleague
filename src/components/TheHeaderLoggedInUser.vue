<template>
  <div class="header-user">
    <button
      class="header-user__button"
      type="button"
      aria-label="Toggle user info"
      @click="showMenu = !showMenu"
    >
      <div class="header-user__button-content">
        <span class="header-user__name">
          {{ user.username }}
        </span>
        <img
          class="header-user__avatar"
          src="/images/avatar/purple-shirt-man.png"
          alt="User profile picture"
        />
      </div>
      <BaseIcon
        class="header-user__icon-arrow"
        icon="chevron"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore.js';

const { user } = useAuthStore();

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
    @include for-large-tablet-portrait-down {
      display: none;
    }
  }
}
</style>
