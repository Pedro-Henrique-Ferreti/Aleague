<template>
  <AuthCard
    :error-message="errorMessage"
    @submit-form="submitForm"
  >
    <template #title>
      Bem-vindo de volta
    </template>
    <template #description>
      Digite email e senha para acessar sua conta
    </template>
    <template #form-fields>
      <AppInput
        v-model.lazy="form.email"
        label="Email"
        :dirty="v$.email.$dirty"
        :error-message="v$.email.$errors[0]?.$message"
      />
      <AppInput
        v-model.lazy="form.password"
        type="password"
        label="Senha"
        :dirty="v$.password.$dirty"
        :error-message="v$.password.$errors[0]?.$message"
      />
    </template>
    <template #form-footer>
      <AppButton
        block
        type="submit"
        :is-loading="isLoading"
      >
        Fazer login
      </AppButton>
    </template>
  </AuthCard>
</template>

<script lang="ts" setup>
import type { ApiError } from '@/types/Auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth';
import { requiredValidator } from '@/helpers/validators';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AuthCard from '@/components/AuthCard.vue';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: '',
  password: '',
});

// Validation rules
const v$ = useVuelidate({
  email: {
    required: requiredValidator,
  },
  password: { required: requiredValidator },
}, form, { $autoDirty: true });

// Submit form
const isLoading = ref(false);
const errorMessage = ref('');

async function submitForm() {
  errorMessage.value = '';

  if (!await v$.value.$validate()) return;

  isLoading.value = true;

  try {
    await authStore.login(form.value);
    router.push({ name: 'tournaments' });
  } catch (error: any) {
    errorMessage.value = (error.response)
      ? (error.response as ApiError).data.message
      : 'Ocorreu um erro inesperado. Por favor, tente novamente.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.login {
  &__divider {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: $color--text-200;
      position: absolute;
    }
    span {
      padding: 0 0.5rem;
      background-color: $color--white;
      z-index: 1;
    }
  }
  &__button-icon {
    height: 1.5rem !important;
  }
}
</style>
