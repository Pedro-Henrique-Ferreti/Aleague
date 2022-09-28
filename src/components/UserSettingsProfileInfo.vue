<template>
  <section class="user-profile-info">
    <SectionHeader>Informações pessoais</SectionHeader>
    <div class="user-profile-info__form">
      <AppTextField
        readonly
        id="user-profile-info--field-email"
        label="Email"
        :model-value="user?.email"
      />
      <AppTextField
        id="user-profile-info--field-username"
        label="Nome de usuário"
        v-model="profile.username"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useUserSettingsStore } from '@/stores/userSettingsStore';
import AppTextField from './AppTextField.vue';
import SectionHeader from './SectionHeader.vue';

const { user } = useUserStore();
const userSettingsStore = useUserSettingsStore();

const { profile } = storeToRefs(userSettingsStore);
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
