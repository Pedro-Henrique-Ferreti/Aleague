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
        id="login--email"
        label="Email"
        :dirty="v$.email.$dirty"
        :error-message="v$.email.$errors[0]?.$message"
      />
      <AppInput
        v-model.lazy="form.password"
        id="login--password"
        type="password"
        label="Senha"
        :dirty="v$.password.$dirty"
        :error-message="v$.password.$errors[0]?.$message"
      >
        <template #support-text>
          <AppTextButton :to="{ name: 'recover-password' }">
            Recuperar senha
          </AppTextButton>
        </template>
      </AppInput>
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
    <template #footer>
      <div class="login__divider">
        <span>Ou entrar com</span>
      </div>
      <AppButton
        outline
        block
      >
        <template #icon-left>
          <IconGoogle class="login__button-icon" />
        </template>
        Google
      </AppButton>
      <p class="login__register">
        Não possui uma conta?
        <RouterLink
          class="app-link"
          :to="{ name: 'register' }"
        >
          Cadastre-se
        </RouterLink>
      </p>
    </template>
  </AuthCard>
</template>

<script lang="ts" setup>
import type { ApiError } from '@/types/Auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth';
import { emailValidator, requiredValidator } from '@/helpers/validators';
import IconGoogle from '@/assets/icons/IconGoogle.svg';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppTextButton from '@/components/AppTextButton.vue';
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
    email: emailValidator,
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
    router.push({ name: 'teams' });
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
  &__register {
    margin-top: 3rem;
    text-align: center;
  }
}
</style>
