<template>
  <form
    class="delete-account-form"
    @submit.prevent="deleteUserAccount"
  >
    <AppTransition name="fade">
      <div
        v-if="activeStep === steps.DELETE_ACCOUNT_REASON"
        class="delete-account-form__step"
      >
        <p>
          Antes de continuar, você poderia por favor nos informar por qual motivo deseja excluir sua conta?
        </p>
        <AppSelect
          v-model="deleteAccount.reason"
          class="delete-account-form__input"
          id="delete-account-reason"
          aria-label="Motivo para excluir a conta"
        >
          <option
            v-for="option in DELETE_ACCOUNT_REASONS"
            v-text="option.text"
            :key="option.id"
            :value="option.id"
          />
        </AppSelect>
      </div>
      <div
        v-if="activeStep === steps.ADDITIONAL_COMMENTARY"
        class="delete-account-form__step"
      >
        <p>
          Você gostaria de enviar um comentário adicional para a equipe do Aleague? Esta etapa é opcional.
        </p>
        <AppTextarea
          v-model="deleteAccount.commentary"
          class="delete-account-form__input"
          id="delete-account-commentary"
          type="textarea"
          aria-label="Comentário adicional"
          :maxlength="COMMENTARY_MAX_LENGTH"
        />
        {{ deleteAccount.commentary }}
      </div>
      <div
        v-if="activeStep === steps.VERIFICATION_CODE"
        class="delete-account-form__step"
      >
        <p class="delete-account-form__step-description">
          Para excluir a conta, por favor informe o código de seis dígitos recebido em seu email.
        </p>
      </div>
    </AppTransition>
    <div class="delete-account-form__footer">
      <AppButton
        color="gray"
        :to="{ name: 'home' }"
      >
        Cancelar e voltar ao Aleague
      </AppButton>
      <AppButton
        v-show="activeStep !== steps.VERIFICATION_CODE"
        :is-loading="isSendingCode"
        @click="handleContinueButtonClick"
      >
        Continuar
      </AppButton>
      <AppButton
        v-show="activeStep === steps.VERIFICATION_CODE"
        color="danger"
        type="submit"
        :is-loading="isDeletingAccount"
      >
        Confirmar e excluir minha conta
      </AppButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { DELETE_ACCOUNT_REASONS, COMMENTARY_MAX_LENGTH } from '@/constants/deleteAccount';

import AppTransition from './AppTransition.vue';
import AppSelect from './AppSelect.vue';
import AppTextarea from './AppTextarea.vue';

const authStore = useAuthStore();
const { openSnackbarNotification } = useNotificationStore();

// Form steps
const steps = {
  DELETE_ACCOUNT_REASON: 1,
  ADDITIONAL_COMMENTARY: 2,
  VERIFICATION_CODE: 3,
};
const activeStep = ref(steps.DELETE_ACCOUNT_REASON);

const deleteAccount = ref({
  reason: DELETE_ACCOUNT_REASONS[0].id,
  commentary: '',
});

// Continue button click
function handleContinueButtonClick() {
  if (activeStep.value === steps.ADDITIONAL_COMMENTARY) {
    sendVerificationCode();
    return;
  }

  activeStep.value = steps.ADDITIONAL_COMMENTARY;
}

// Send verification code
const isSendingCode = ref(false);

async function sendVerificationCode() {
  isSendingCode.value = true;

  try {
    await authStore.sendDeleteAccountVerificationCode();

    activeStep.value = steps.VERIFICATION_CODE;
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isSendingCode.value = false;
  }
}

// Delete account
const isDeletingAccount = ref(false);

async function deleteUserAccount() {
  isDeletingAccount.value = true;

  setTimeout(() => {
    isDeletingAccount.value = false;
  }, 1000);
}
</script>

<style lang="scss" scoped>
.delete-account-form {
  margin-top: 2rem;
  &__input {
    max-width: 31.25rem;
    margin: 0 auto;
    margin-top: 1.5rem;
  }
  &__footer {
    display: grid;
    gap: 1.5rem;
    margin-top: 2.5rem;
    @include for-tablet-portrait-up {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
