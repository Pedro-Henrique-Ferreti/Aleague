<template>
  <section class="user-profile-picture">
    <UserSettingsHeader>Foto de perfil</UserSettingsHeader>
    <div class="user-profile-picture__content">
      <img
        class="user-profile-picture__current-avatar"
        alt="User profile picture"
        :src="selectedAvatar"
      />
      <div class="user-profile-picture__avatar-panel">
        <button
          v-for="(picture, index) in PROFILE_PICTURES"
          class="user-profile-picture__avatar-button"
          type="button"
          :key="picture.path"
          :class="{ 'user-profile-picture__avatar-button--selected': selectedAvatar === picture.path }"
          :aria-label="`Avatar option ${index}: ${picture.description}`"
          @click="selectedAvatar = picture.path"
        >
          <img
            class="user-profile-picture__avatar-button-image"
            :src="picture.path"
            :alt="picture.description"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { PROFILE_PICTURES } from '@/data';
import UserSettingsHeader from './UserSettingsHeader.vue';

const userStore = useUserStore();

const selectedAvatar = ref(userStore.user.avatar || '');
</script>

<style lang="scss" scoped>
.user-profile-picture {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }
  &__current-avatar {
    width: 6rem;
    height: 6rem;
  }
  &__avatar-panel {
    @include scrollbar($color: $color--primary, $width: 5px);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    height: 12.5rem;
    padding: 1rem;
    border: 1px solid $color--light-gray-1;
    border-radius: 0.5rem;
    overflow-y: auto;
  }
  &__avatar-button {
    @include focus-ring;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    &--selected {
      border: 1px solid $color--primary;
    }
  }
  &__avatar-button-image {
    width: 3rem;
    height: 3rem;
  }
  @include for-large-tablet-portrait-up {
    .user-profile-picture__content {
      flex-direction: row;
    }
  }
}
</style>
