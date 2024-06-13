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
      <span class="app-link">
        Cadastre-se
      </span>
    </p>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { emailValidator, requiredValidator } from '@/helpers/validators';
import IconGoogle from '@/assets/icons/IconGoogle.svg';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppTextButton from '@/components/AppTextButton.vue';

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

async function submitForm() {
  if (!await v$.value.$validate()) return;

  isLoading.value = true;
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
