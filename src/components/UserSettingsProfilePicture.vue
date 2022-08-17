<template>
  <section class="user-profile-picture">
    <UserSettingsHeader>Foto de perfil</UserSettingsHeader>
    <div class="user-profile-picture__content">
      <img
        class="user-profile-picture__current-avatar"
        src="/images/avatar/purple-shirt-man.png"
        alt="User profile picture"
      />
      <div class="user-profile-picture__avatar-panel">
        <button
          v-for="n in 40"
          :key="n"
          class="user-profile-picture__avatar-button"
          type="button"
          :class="{ 'user-profile-picture__avatar-button--selected': true }"
          aria-label="Avatar option 1: White man wearing a blue shirt"
        >
          <img
            class="user-profile-picture__avatar-button-image"
            src="/images/avatar/purple-shirt-man.png"
            alt="White man wearing a blue shirt"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import UserSettingsHeader from './UserSettingsHeader.vue';
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
