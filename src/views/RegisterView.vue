<template>
  <AuthCard
    :error-message="errorMessage"
    @submit-form="submitForm"
  >
    <template #title>
      Crie sua conta
    </template>
    <template #description>
      Para começar, preencha os campos abaixo
    </template>
    <template #form-fields>
      <AppInput
        v-model.lazy="form.username"
        label="Nome de usuário"
        :dirty="v$.username.$dirty"
        :error-message="v$.username.$errors[0]?.$message"
      />
      <AppInput
        v-model.lazy="form.email"
        label="Email"
        :dirty="v$.email.$dirty"
        :error-message="v$.email.$errors[0]?.$message"
      />
      <AppInput
        v-model.lazy="form.password"
        label="Senha"
        type="password"
        :dirty="v$.password.$dirty"
        :error-message="v$.password.$errors[0]?.$message"
      />
      <AppInput
        v-model.lazy="form.passwordConfirmation"
        type="password"
        label="Repita a senha"
        :dirty="v$.passwordConfirmation.$dirty"
        :error-message="v$.passwordConfirmation.$errors[0]?.$message"
      />
    </template>
    <template #form-footer>
      <AppButton
        block
        type="submit"
        :is-loading="isLoading"
      >
        Criar conta
      </AppButton>
    </template>
    <template #footer>
      <p class="register__login">
        Já possui uma conta?
        <RouterLink
          class="app-link"
          :to="{ name: 'login' }"
        >
          Fazer login
        </RouterLink>
      </p>
    </template>
  </AuthCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { helpers, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth';
import { emailValidator, requiredValidator } from '@/helpers/validators';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AuthCard from '@/components/AuthCard.vue';

const router = useRouter();
const authStore = useAuthStore();

// Form
const form = ref({
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});

// Validation rules
const sameAsPassword = (value: string) => value === form.value.password;

const v$ = useVuelidate({
  email: {
    required: requiredValidator,
    email: emailValidator,
  },
  username: {
    required: requiredValidator,
    minLength: helpers.withMessage(
      'O nome de usuário deve ter ao menos 6 caracteres.',
      minLength(6),
    ),
  },
  password: {
    required: requiredValidator,
    minLength: helpers.withMessage(
      'A senha deve ter ao menos 8 caracteres.',
      minLength(8),
    ),
  },
  passwordConfirmation: {
    required: requiredValidator,
    sameAsRef: helpers.withMessage(
      'As senhas informadas devem ser iguais.',
      sameAsPassword,
    ),
  },
}, form, { $autoDirty: true });

// Submit form
const isLoading = ref(false);
const errorMessage = ref('');

async function submitForm() {
  errorMessage.value = '';

  if (!await v$.value.$validate()) return;

  isLoading.value = true;

  try {
    await authStore.register(form.value);
    router.push({ name: 'tournaments' });
  } catch (error: any) {
    errorMessage.value = 'Ocorreu um erro inesperado. Por favor, tente novamente.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.register {
  &__login {
    margin-top: 3rem;
    text-align: center;
  }
}
</style>
