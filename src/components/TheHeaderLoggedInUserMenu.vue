<template>
  <div class="header-user-menu">
    <div class="header-user-menu__avatar">
      <button
        class="header-user-menu__edit-avatar-button"
        type="button"
        title="Edit user avatar"
        aria-label="Edit user avatar"
        @click="handleEditUserAvatarClick"
      >
        <img
          class="header-user-menu__avatar-image"
          alt="User profile picture"
          :src="userStore.user.avatar || ''"
        />
        <span class="header-user-menu__edit-avatar-button-icon-wrapper">
          <BaseIcon
            class="header-user-menu__edit-avatar-button-icon"
            icon="pencil"
          />
        </span>
      </button>
      <span class="header-user-menu__name">
        {{ userStore.user.username }}
      </span>
    </div>
    <div class="header-user-menu__info">
      <div class="header-user-menu__info-item">
        <BaseIcon
          class="header-user-menu__info-icon"
          icon="envelope-check"
        />
        <span class="header-user-menu__info-text">
          {{ userStore.user.email }}
        </span>
      </div>
      <div class="header-user-menu__info-item">
        <BaseIcon
          class="header-user-menu__info-icon"
          icon="clock"
        />
        <span class="header-user-menu__info-text">Última aparição: 8 horas atrás</span>
      </div>
    </div>
    <AppButton
      class="header-user-menu__logout-button"
      color="gray"
      size="small"
      icon-left="logout"
      @click="logoutUser"
    >
      Sair
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

const emit = defineEmits(['close']);

const router = useRouter();
const userStore = useUserStore();
const { logout } = useAuthStore();

function logoutUser() {
  logout();

  router.push({ name: 'landing' });
}

function handleEditUserAvatarClick() {
  userStore.openUserSettingsModal();

  emit('close');
}
</script>

<style lang="scss" scoped>
.header-user-menu {
  width: 16.5rem;
  padding: 1rem 0;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: .5rem;
  box-shadow: $box-shadow--layer-2;
  &__avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  &__avatar-image {
    width: 3.75rem;
    height: 3.75rem;
  }
  &__edit-avatar-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.5rem;
    height: 4.5rem;
    border: 1px solid $color--primary;
    border-radius: 50%;
    position: relative;
    @include focus-ring($apply-position: false);
  }
  &__edit-avatar-button-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.125rem;
    height: 1.125rem;
    background-color: $color--primary;
    border-radius: 50%;
    position: absolute;
    bottom: 0.25rem;
    right: 0;
  }
  &__edit-avatar-button-icon {
    fill: $color--white;
    width: 70%;
    height: 70%;
  }
  &__name {
    margin-top: 0.25rem;
  }
  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 1rem;
    border-top: 1px solid $color--light-gray-1;
    border-bottom: 1px solid $color--light-gray-1;
  }
  &__info-item {
    display: grid;
    grid-template-columns: 1rem 1fr;
    gap: 0.5rem;
  }
  &__info-icon {
    width: 1rem;
    height: 1rem;
    margin-top: 0.125rem;
  }
  .header-user-menu__logout-button {
    display: flex;
    margin: 0 auto;
  }
}
</style>
