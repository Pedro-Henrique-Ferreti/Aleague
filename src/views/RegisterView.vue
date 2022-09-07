<template>
  <AuthHeading>Crie sua conta</AuthHeading>
  <AuthForm
    :error-message="errorMessage"
    @close-alert="errorMessage = ''"
    @submit="submitForm"
  >
    <AppTextField
      v-model.lazy="username"
      id="register--field-name"
      label="Nome de usuário"
      :dirty="v$.username.$dirty"
      :error-message="(v$.username.$errors[0]?.$message as string)"
    />
    <AppTextField
      v-model.lazy="email"
      id="register--field-email"
      type="email"
      label="Email"
      :dirty="v$.email.$dirty"
      :error-message="(v$.email.$errors[0]?.$message as string)"
    />
    <AppTextField
      v-model.lazy="password"
      id="register--field-password"
      type="password"
      label="Senha"
      :dirty="v$.password.$dirty"
      :error-message="(v$.password.$errors[0]?.$message as string)"
    />
    <AppTextField
      v-model.lazy="passwordConfirmation"
      id="register--field-confirm-password"
      type="password"
      label="Repita a senha"
      :dirty="v$.passwordConfirmation.$dirty"
      :error-message="(v$.passwordConfirmation.$errors[0]?.$message as string)"
    />
    <template #footer>
      <AppButton
        type="submit"
        :is-loading="isLoading"
      >
        Criar conta
      </AppButton>
    </template>
  </AuthForm>
  <span class="login text-darken">
    Já possui uma conta?
    <router-link
      class="login__link"
      :to="{ name: 'login' }"
    >
      Faça login
    </router-link>
  </span>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { helpers, sameAs, minLength } from '@vuelidate/validators';
import { required, email as emailValidator } from '@/helpers/i18nValidators';
import { useAuthStore } from '@/stores/authStore';

import AppTextField from '@/components/AppTextField.vue';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';

const router = useRouter();
const authStore = useAuthStore();

const minLenghtValidator = helpers.withMessage('A senha deve ter ao menos 8 caracteres.', minLength(8));

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const rules = computed(() => ({
  username: {
    required,
    minLength: helpers.withMessage('O nome de usuário deve ter ao menos 6 caracteres.', minLength(6)),
  },
  email: {
    required,
    email: emailValidator,
  },
  password: {
    required,
    minLength: minLenghtValidator,
  },
  passwordConfirmation: {
    required,
    minLength: minLenghtValidator,
    sameAsRef: helpers.withMessage('As senhas informadas não são iguais.', sameAs(password)),
  },
}));

const v$ = useVuelidate(rules, {
  username,
  email,
  password,
  passwordConfirmation,
}, { $autoDirty: true });

async function submitForm() {
  errorMessage.value = '';

  const formIsValid = await v$.value.$validate();

  if (!formIsValid) {
    return;
  }

  isLoading.value = true;

  try {
    await authStore.register({
      username: username.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    });

    router.push({
      name: 'verify-email',
      query: {
        from: 'register',
      },
    });
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: block;
  width: 100%;
  margin-top: 5rem;
  text-align: center;
  &__link {
    color: $color--secondary;
    @include focus-ring;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
