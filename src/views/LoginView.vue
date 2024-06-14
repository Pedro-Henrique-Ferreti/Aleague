<template>
  <main>
    <h1 class="h2 text-center">
      Bem-vindo de volta
    </h1>
    <p class="form__description">
      Digite email e senha para acessar sua conta
    </p>
    <form
      class="form"
      @submit.prevent="submitForm"
    >
      <div class="form__fields">
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
            <AppTextButton>
              Recuperar senha
            </AppTextButton>
          </template>
        </AppInput>
      </div>
      <AppToast
        v-if="errorMessage"
        class="form__toast"
        :type="TYPE.ERROR"
        :message="errorMessage"
      />
      <div class="form__footer">
        <AppButton
          class="form__button"
          type="submit"
          :is-loading="isLoading"
        >
          Fazer login
        </AppButton>
        <div class="form__footer-divider">
          <span>Ou entrar com</span>
        </div>
        <AppButton
          class="form__button"
          outline
        >
          <template #icon-left>
            <IconGoogle />
          </template>
          Google
        </AppButton>
      </div>
    </form>
    <p class="text-center">
      Não possui uma conta?
      <RouterLink
        class="app-link"
        :to="{ name: 'register' }"
      >
        Cadastre-se
      </RouterLink>
    </p>
  </main>
</template>

<script lang="ts" setup>
import type { ApiError } from '@/types/Auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { TYPE } from 'vue-toastification';
import useVuelidate from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth';
import { emailValidator, requiredValidator } from '@/helpers/validators';
import IconGoogle from '@/assets/icons/IconGoogle.svg';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import AppToast from '@/components/AppToast.vue';

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
.form {
  margin-bottom: 3rem;
  &__description {
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  &__fields {
    display: grid;
    gap: 1rem;
  }
  &__button {
    width: 100%;
  }
  &__toast {
    margin-top: 2rem;
  }
  &__footer {
    display: grid;
    gap: 2rem;
    margin-top: 2rem;
  }
  &__footer-divider {
    display: flex;
    justify-content: center;
    align-items: center;
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
}
</style>
