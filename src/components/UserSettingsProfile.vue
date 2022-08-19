<template>
  <section class="user-profile">
    <p class="user-profile__description">
      Atualize sua foto de perfil e informações pessoais.
    </p>
    <UserSettingsProfilePicture />
    <UserSettingsProfileInfo />
    <UserSettingsProfileDangerZone />
  </section>
</template>

<script lang="ts" setup>
import UserSettingsProfilePicture from './UserSettingsProfilePicture.vue';
import UserSettingsProfileInfo from './UserSettingsProfileInfo.vue';
import UserSettingsProfileDangerZone from './UserSettingsProfileDangerZone.vue';
</script>

<style lang="scss" scoped>
.user-profile{
  &__description {
    margin-bottom: 1rem;
    @include for-tablet-portrait-up {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
