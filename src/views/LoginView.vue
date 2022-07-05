<template>
  <AuthHeading>Acesse sua conta</AuthHeading>
  <AuthForm>
    <TextField
      id="login--field-email"
      type="email"
      label="Email"
      :dirty="v$.email.$dirty"
      :error-message="v$.email.$errors[0]?.$message"
      v-model.lazy="email"
    />
    <TextField
      id="login--field-password"
      type="password"
      label="Senha"
      :dirty="v$.password.$dirty"
      :error-message="v$.password.$errors[0]?.$message"
      v-model.lazy="password"
    />
    <template #footer>
      <BaseButton
        :is-loading="isLoading"
        @click="submitForm"
      >
        Fazer login
      </BaseButton>
      <BaseButton color="gray">
        Recuperar senha
      </BaseButton>
    </template>
  </AuthForm>
  <span class="register">
    Não tem uma conta?
    <router-link
      class="register__link"
      :to="{ name: 'register' }"
    >
      Cadastre-se
    </router-link>
  </span>
</template>

<script setup>
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email as emailValidator, helpers } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/authStore';

import TextField from '@/components/common/TextField.vue';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Por favor, preencha este campo.', required),
    email: helpers.withMessage('O endereço de emal informado é inválido.', emailValidator),
  },
  password: {
    required: helpers.withMessage('Por favor, preencha este campo.', required),
  },
}));

const v$ = useVuelidate(rules, { email, password }, { $autoDirty: true });

async function submitForm() {
  const formIsValid = await v$.value.$validate();

  if (!formIsValid) {
    return;
  }

  isLoading.value = true;

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.register {
  display: block;
  width: 100%;
  margin-top: 5rem;
  color: $color--text-darken;
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
