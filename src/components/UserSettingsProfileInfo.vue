<template>
  <section class="user-profile-info">
    <UserSettingsHeader>Informações pessoais</UserSettingsHeader>
    <div class="user-profile-info__form">
      <AppTextField
        readonly
        id="user-profile-info--field-email"
        label="Email"
        :model-value="userStore.user.email || ''"
      />
      <AppTextField
        id="user-profile-info--field-username"
        label="Nome de usuário"
        v-model="username"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import UserSettingsHeader from './UserSettingsHeader.vue';
import AppTextField from './AppTextField.vue';

const userStore = useUserStore();

const username = ref(userStore.user.username || '');
</script>

<style lang="scss" scoped>
.user-profile-info {
  margin-top: 2rem;
  &__form {
    display: grid;
    gap: 1.5rem;
    @include for-tablet-portrait-up {
      width: 45%;
    }
  }
}
</style>
