<template>
  <div>
    <AuthHeading :subtitle="($route.query.email as string)">
      Redefina sua senha
    </AuthHeading>
    <p class="text-darken">
      Por favor, digite a sua nova senha.
    </p>
    <AuthForm
      class="reset-password-form"
      :error-message="errorMessage"
      @close-alert="errorMessage = ''"
      @submit="submitForm"
    >
      <AppTextField
        v-model.lazy="password"
        id="reset-password--field-new-password"
        type="password"
        label="Nova senha"
        :dirty="v$.password.$dirty"
        :error-message="(v$.password.$errors[0]?.$message as string)"
      />
      <AppTextField
        v-model.lazy="passwordConfirmation"
        id="reset-password--field-password-confirmation"
        type="password"
        label="Repita a nova senha"
        :dirty="v$.passwordConfirmation.$dirty"
        :error-message="(v$.passwordConfirmation.$errors[0]?.$message as string)"
      />
      <template #footer>
        <AppButton
          type="submit"
          :is-loading="isLoading"
        >
          Redefinir senha
        </AppButton>
      </template>
    </AuthForm>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { helpers, sameAs, minLength } from '@vuelidate/validators';
import { required } from '@/helpers/i18nValidators';
import { useAuthStore } from '@/stores/authStore';
import AppTextField from './common/AppTextField.vue';
import AuthForm from './AuthForm.vue';
import AuthHeading from './AuthHeading.vue';

const emit = defineEmits(['password-reset']);

const route = useRoute();
const authStore = useAuthStore();

const minLenghtValidator = helpers.withMessage(
  'Sua nova senha deve ter ao menos 8 caracteres.',
  minLength(8),
);

const password = ref('');
const passwordConfirmation = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const rules = computed(() => ({
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
    await authStore.resetPassword({
      email: route.query.email as string,
      token: route.query.token as string,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    });

    emit('password-reset');
  } catch (error: Error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.reset-password-form {
  margin-top: 1.5rem;
}
</style>
