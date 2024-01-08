<template>
  <AuthHeading>Acesse sua conta</AuthHeading>
  <AuthForm
    :error-message="errorMessage"
    @close-alert="errorMessage = ''"
    @submit="submitForm"
  >
    <AppTextField
      id="login--field-email"
      type="email"
      label="Email"
      :dirty="v$.email.$dirty"
      :error-message="(v$.email.$errors[0]?.$message as string)"
      v-model.lazy="email"
    />
    <AppTextField
      id="login--field-password"
      type="password"
      label="Senha"
      :dirty="v$.password.$dirty"
      :error-message="(v$.password.$errors[0]?.$message as string)"
      v-model.lazy="password"
    />
    <template #footer>
      <AppButton
        type="submit"
        :is-loading="isLoading"
      >
        Fazer login
      </AppButton>
      <AppButton
        color="gray"
        :to="{ name: 'password-recovery'}"
      >
        Recuperar senha
      </AppButton>
    </template>
  </AuthForm>
  <span class="register text-darken">
    Não tem uma conta?
    <router-link
      class="register__link"
      :to="{ name: 'register' }"
    >
      Cadastre-se
    </router-link>
  </span>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { requiredValidator, emailValidator } from '@/helpers/validators';
import { useAuthStore } from '@/stores/auth';
import AppButton from '@/components/AppButton.vue';
import AppTextField from '@/components/AppTextField.vue';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('john.doe@gmail.com');
const password = ref('safe_password');
const isLoading = ref(false);
const errorMessage = ref('');

const rules = computed(() => ({
  email: {
    required: requiredValidator,
    email: emailValidator,
  },
  password: { required: requiredValidator },
}));

const v$ = useVuelidate(rules, { email, password }, { $autoDirty: true });

async function submitForm() {
  errorMessage.value = '';

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

    if (!authStore.user?.emailVerifiedAt) {
      router.push({ name: 'verify-email' });
      return;
    }

    router.push({ name: 'home' });
  } catch (error: any) {
    errorMessage.value = error.message;
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
