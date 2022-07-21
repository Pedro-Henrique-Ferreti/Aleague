<template>
  <AuthHeading>Recupere sua senha</AuthHeading>
  <p class="text-darken">
    Para recuperar sua senha, digite o endereço de email que você utiliza para acessar sua conta.
  </p>
  <AuthForm
    class="password-recovery__form"
    :error-message="errorMessage"
    @close-alert="errorMessage = ''"
    @submit="submitForm"
  >
    <TextField
      v-model.lazy="email"
      id="password-recovery--field-email"
      type="email"
      label="Email"
      :dirty="v$.email.$dirty"
      :error-message="v$.email.$errors[0]?.$message"
    />
    <template #footer>
      <BaseButton
        type="submit"
        :is-loading="isLoading"
      >
        Recuperar senha
      </BaseButton>
      <BaseButton
        color="gray"
        :to="{ name: 'login' }"
      >
        Voltar
      </BaseButton>
    </template>
  </AuthForm>
</template>

<script setup>
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email as emailValidator } from '@/helpers/i18nValidators';
import { useAuthStore } from '@/stores/authStore';
import TextField from '@/components/common/TextField.vue';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';

const authStore = useAuthStore();

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const rules = computed(() => ({
  email: {
    required,
    email: emailValidator,
  },
}));

const v$ = useVuelidate(rules, { email }, { $autoDirty: true });

async function submitForm() {
  errorMessage.value = '';

  const formIsValid = await v$.value.$validate();

  if (!formIsValid) {
    return;
  }

  isLoading.value = true;

  try {
    const { data } = await authStore.sendPasswordRecoveryEmail(email.value);

    console.log(data.message);
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.password-recovery__form {
  margin-top: 2rem;
}
</style>
